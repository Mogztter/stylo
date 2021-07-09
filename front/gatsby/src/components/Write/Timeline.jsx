import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Timeline.module.scss'
import menuStyles from './menu.module.scss'
import buttonStyles from '../button.module.scss'

import Modal from '../Modal'
import Export from '../Export'
import { connect } from 'react-redux'

import { Save } from 'react-feather'
import Button from '../Button'
import Field from '../Field'
import etv from '../../helpers/eventTargetValue'
import formatTimeAgo from '../../helpers/formatTimeAgo'


Date.prototype.getUTCMinutesDoubleDigit = function () {
  if (this.getUTCMinutes() < 10) {
    return '0' + this.getUTCMinutes()
  }
  return this.getUTCMinutes()
}
Date.prototype.getUTCHoursDoubleDigit = function () {
  if (this.getUTCHours() < 10) {
    return '0' + this.getUTCHours()
  }
  return this.getUTCHours()
}
Date.prototype.getUTCMonthDoubleDigit = function () {
  if (this.getUTCMonth() + 1 < 9) {
    return '0' + Number(this.getUTCMonth() + 1)
  }
  return Number(this.getUTCMonth() + 1)
}
Date.prototype.getUTCDateDoubleDigit = function () {
  if (this.getUTCDate() < 10) {
    return '0' + this.getUTCDate()
  }
  return this.getUTCDate()
}

Date.prototype.formatMMDDYYYY = function () {
  return (
    this.getUTCHoursDoubleDigit() +
    ':' +
    this.getUTCMinutesDoubleDigit() +
    'utc ' +
    this.getUTCDateDoubleDigit() +
    '/' +
    this.getUTCMonthDoubleDigit() +
    '/' +
    this.getFullYear()
  )
}

const mapStateToProps = ({ applicationConfig }) => {
  return { applicationConfig }
}

function Timeline (props) {
  //Default if live
  let expVar = {
    article: true,
    _id: props.article._id,
    title: props.article.title,
    versionId: props.versions[0]._id,
    version: props.versions[0].version,
    revision: props.versions[0].revision,
  }
  //if not live, set the export variable
  if (props.readOnly) {
    expVar = {
      ...expVar,
      article: false,
      _id: props._id,
      versionId: props._id,
      version: props.version,
      revision: props.revision,
    }
  }

  const [message, setMessage] = useState('')
  const [expand, setExpand] = useState(true)
  const [expandSaveForm, setExpandSaveForm] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [exportVar, setExportVar] = useState(expVar)
  const [savedAgo, setSavedAgo] = useState(
    formatTimeAgo(new Date(props.versions[0].updatedAt))
  )

  const saveVersion = async (e, major = false) => {
    e.preventDefault()
    await props.sendVersion(false, major, message)
    //const newVersion = await props.sendVersion(false,major, message)
    setMessage('')
    //setVersions([newVersion.saveVersion,...versions])
    setExpandSaveForm(false)
  }

  const lastVersionId = props.versions[0]._id

  return (
    <section className={[styles.section, menuStyles.section].join(' ')}>
      <ul className={styles.timeline}>
        {props.readOnly && <li key={`showVersion-GoLive`}>
          <Link to={`/article/${props.article._id}`}>Back to edit mode</Link>
        </li>}
        {props.versions.map((v) => (
          <li
            key={`showVersion-${v._id}`}
            className={
              v._id === props.selectedVersion
                ? styles.selected
                : v._id === props.compareTo
                ? styles.compareTo
                : null
            }
          >
            <Link to={`/article/${props.article._id}/version/${v._id}`}>
              {v.message ? v.message : 'No label'} (
              {v.autosave ? 'autosaved ' : null}
              {v.version}.{v.revision})
            </Link>
            <p>
              {v.owner && (
                <span>
                      by <strong>{v.owner.displayName}</strong>{' '}
                    </span>
              )}
              {lastVersionId !== v._id && <span>at {new Date(v.updatedAt).formatMMDDYYYY()}</span>}
              {lastVersionId === v._id && <span>{savedAgo}</span>}
            </p>
            {lastVersionId === v._id && expandSaveForm && (
              <form
                className={styles.saveForm}
                onSubmit={(e) => saveVersion(e, false)}
              >
                <Field
                  className={styles.saveVersionInput}
                  placeholder="Label of the version"
                  value={message}
                  onChange={(e) => setMessage(etv(e))}
                />
                <ul className={styles.actions}>
                  <li><Button icon={true} onClick={(e) => saveVersion(e, false)}>Close</Button></li>
                  <li><Button onClick={(e) => saveVersion(e, false)}>Save Minor</Button></li>
                  <li><Button onClick={(e) => saveVersion(e, true)}>Save Major</Button></li>
                </ul>
              </form>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default connect(mapStateToProps)(Timeline)
