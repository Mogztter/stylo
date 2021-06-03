import React, { memo, useState, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'react-feather'

import Modal from '../Modal'
import Bibliographe from './bibliographe/Bibliographe'
import bib2key from './bibliographe/CitationsFilter'

import menuStyles from './menu.module.scss'
import Button from '../Button'
import _BiblioReferenceList from './BiblioReferenceList'

const BiblioReferenceList = memo(_BiblioReferenceList, function areEqual(prevProps, nextProps) {
  return prevProps.bib === nextProps.bib
})

export default function Biblio({ bib, article, handleBib, readOnly }) {
  const [expand, setExpand] = useState(true)
  const [modal, setModal] = useState(false)

  return (
    <section className={menuStyles.section}>
      <h1 onClick={() => setExpand(!expand)}>
        {expand ? <ChevronDown /> : <ChevronRight />} Bibliography
      </h1>
      {expand && (
        <>
          {!readOnly && (
            <Button onClick={() => setModal(true)}>Manage Bibliography</Button>
          )}
          <BiblioReferenceList bib={bib} />
        </>
      )}
      {modal && (
        <Modal cancel={() => setModal(false)}>
          <Bibliographe
            bib={bib}
            success={handleBib}
            cancel={() => setModal(false)}
            article={article}
          />
        </Modal>
      )}
    </section>
  )
}
