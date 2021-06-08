import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import debounce from 'lodash/debounce'
import { Check, Plus, Search, Trash } from 'react-feather'

import etv from '../../../helpers/eventTargetValue'
import { getUserProfile } from '../../../helpers/userProfile'
import askGraphQL from '../../../helpers/graphQL'
import { fetchAllCollectionsPerLibrary, fetchBibliographyFromCollectionHref, } from '../../../helpers/zotero'
import { toBibtex, validate } from '../../../helpers/bibtex'

import styles from './bibliographe.module.scss'

import CitationTable from './CitationTable'
import ManageCitation from './ManageCitation'
import EditRawCitation from './EditRawCitation'

import ReferenceTypeIcon from '../../ReferenceTypeIcon'
import Button from '../../Button'
import Field from '../../Field'
import Select from '../../Select'
import NavTag from '../../NavTab'

const mapStateToProps = ({ articleBib, articleBibTeXEntries, activeUser, applicationConfig }) => {
  return { articleBib, articleBibTeXEntries, activeUser, applicationConfig }
}

const mapDispatchToProps = (dispatch) => ({
  refreshProfile: (applicationConfig) =>
    getUserProfile(applicationConfig).then((response) =>
      dispatch({ type: 'PROFILE', ...response })
    ),
})

function ConnectedBibliographe({ article, cancel, refreshProfile, articleBib, articleBibTeXEntries, activeUser, applicationConfig }) {
  const { backendEndpoint } = applicationConfig
  const [filter, setFilter] = useState('')
  const [selector, setSelector] = useState('zotero')
  const [isSaving, setSaving] = useState(false)
  const [bib, setBib] = useState(articleBib)
  const [bibTeXEntries, setBibTeXEntries] = useState(articleBibTeXEntries)
  const [addCitation, setAddCitation] = useState('')
  const [citationValidationResult, setCitationValidationResult] = useState({
    valid: false,
  })
  const [rawBibTeXValidationResult, setRawBibTeXValidationResult] = useState({
    valid: false,
  })
  const [zoteroLink, setZoteroLink] = useState(article.zoteroLink || '')
  const [zoteroCollectionHref, setZoteroCollectionHref] = useState(null)
  const { zoteroToken } = activeUser
  const [zoteroCollections, setZoteroCollections] = useState({})
  const citationForm = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (zoteroToken) {
      setSaving(true)
      fetchAllCollectionsPerLibrary({ token: zoteroToken })
        .then(setZoteroCollections)
        .finally(() => setSaving(false))
    }
  }, [zoteroToken])

  const mergeCitations = () => {
    setBib(bib + '\n' + addCitation)
    dispatch({ type: 'UPDATE_ARTICLE_BIB', bib })
    citationForm.current.reset()
  }

  const delayedValidateCitation = useCallback(
    debounce(
      (bibtex, setCitationValidationResult, next) =>
        validateCitation(bibtex, setCitationValidationResult, next),
      1000
    ),
    []
  )

  const validateCitation = (bibtex, setCitationValidationResult, next) => {
    next(bibtex)

    validate(bibtex).then((result) => {
      if (result.warnings.length || result.errors.length) {
        setCitationValidationResult({
          valid: false,
          messages: [...result.errors, ...result.warnings],
        })
      } else {
        setCitationValidationResult({
          valid: result.empty || result.success !== 0,
        })
      }
    })
  }

  const removeCitation = (citations, indexToRemove) => {
    console.log('removeCitation', {citations, indexToRemove})
    const filteredEntries = citations
      .filter((entry, index) => index !== indexToRemove)
      .map(({ entry }) => entry)

    const bibtex = toBibtex(filteredEntries)

    // we reform the bibtex output based on what we were able to parse

    setBib(bibtex)
    setBibTeXEntries()
    dispatch({ type: 'UPDATE_ARTICLE_BIB', bib })
  }

  const saveNewZotero = async () => {
    setSaving(true)

    // saveOnGraphQL
    if (article.zoteroLink !== zoteroLink) {
      console.log('Saving to graphQL', article.zoteroLink, zoteroLink)
      try {
        const query = `mutation($user:ID!,$article:ID!,$zotero:String!){zoteroArticle(article:$article,zotero:$zotero,user:$user){ _id zoteroLink}}`
        const variables = {
          zotero: zoteroLink,
          user: activeUser._id,
          article: article._id,
        }
        await askGraphQL(
          { query, variables },
          'updating zoteroLink',
          null,
          applicationConfig
        )
      } catch (err) {
        setSaving(false)
        alert(err)
      }
    }

    // we synchronize the collection, any time we save
    if (zoteroLink) {
      await fetchBibliographyFromCollectionHref({
        collectionHref: `https://api.zotero.org/groups/${zoteroLink}`,
      }).then((result) => {
        setSaving(false)
        const bib = result.join('\n')
        setBib(bib)
        dispatch({ type: 'UPDATE_ARTICLE_BIB', bib })
        cancel()
      })
    } else {
      // previous value was empty, and we tried to save an empty value again
      setSaving(false)
    }
  }

  const importCollection = ({ token, collectionHref }) => {
    setSaving(true)
    fetchBibliographyFromCollectionHref({ token, collectionHref }).then(
      (result) => {
        setSaving(false)
        const bib = result.join('\n')
        setBib(bib)
        dispatch({ type: 'UPDATE_ARTICLE_BIB', bib })
        cancel()
      }
    )
  }

  const zoteroCollectionSelect = (
    <Select onChange={(event) => setZoteroCollectionHref(etv(event))}>
      <option value="">
        {isSaving ? 'Fetching collections…' : 'Pick a collection'}
      </option>
      {Object.entries(zoteroCollections).map(([_, collections]) => (
        <optgroup
          key={collections[0].key}
          label={`${collections[0].library.name} (${collections[0].library.type})`}
        >
          {collections.map(({ data, meta, links }) => (
            <option key={data.key} value={links.self.href}>
              {data.name} ({meta.numItems} items)
            </option>
          ))}
        </optgroup>
      ))}
    </Select>
  )

  const bibTeXFound = bibTeXEntries
    .filter((entry) => entry.key.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  const bibTeXResult = bibTeXFound
    .slice(0, 10)

  return (
    <article>
      <h1 className={styles.title}>Bibliography</h1>
      <NavTag defaultValue={selector} onChange={(value) => setSelector(value)} items={[
        {
          value: 'zotero',
          name: 'Zotero'
        },
        {
          value: 'citations',
          name: 'Citations'
        },
        {
          value: 'raw',
          name: 'Raw BibTeX'
        }
      ]
      } />
      {selector === 'zotero' && (
        <div className={styles.zotero}>
          <h3>Import by URL</h3>

          <form onSubmit={(e) => e.preventDefault() && saveNewZotero()}>
            <p>
              Please paste the URL of your Zotero library, so that it looks like
              https://www.zotero.org/groups/
              <strong>[IDnumber]/collections/[IDcollection]</strong>
            </p>
            <label>https://www.zotero.org/groups/</label>
            <Field
              placeholder="[IDnumber]/collections/[IDcollection]"
              value={zoteroLink}
              onChange={(e) => setZoteroLink(etv(e))}
            />
            <Button
              type="submit"
              primary={true}
              onClick={() => saveNewZotero()}
              disabled={
                isSaving ||
                (!zoteroLink && zoteroLink === article.zoteroLink)
              }
            >
              {isSaving
                ? 'Fetching…'
                : 'Replace bibliography with this collection'}
            </Button>
          </form>
          <hr />
          <h3>Import from my Zotero account</h3>
          <form disabled={isSaving} onSubmit={(e) => e.preventDefault()}>
            {zoteroToken && zoteroCollectionSelect}
            {zoteroToken && (
              <Button
                type="submit"
                disabled={!zoteroCollectionHref || isSaving}
                onClick={() =>
                  importCollection({
                    token: zoteroToken,
                    collectionHref: zoteroCollectionHref,
                  })
                }
              >
                {isSaving
                  ? 'Fetching…'
                  : 'Replace bibliography with this private collection'}
              </Button>
            )}
            {!zoteroToken && (
              <Button
                type="button"
                onClick={() => {
                  const popup = window.open(
                    `${backendEndpoint}/login/zotero`,
                    'openid',
                    'width=660&height=360&menubar=0&toolbar=0'
                  )
                  const intervalId = setInterval(() => {
                    if (popup.closed) {
                      refreshProfile(applicationConfig)
                      clearInterval(intervalId)
                    }
                  }, 1000)
                }}
              >
                Connect my account
              </Button>
            )}
          </form>
        </div>
      )}

      {selector === 'citations' && <ManageCitation />}
      {selector === 'raw' && <EditRawCitation />}
    </article>
  )
}

const Bibliographe = connect(mapStateToProps, mapDispatchToProps)(ConnectedBibliographe)
export default Bibliographe
