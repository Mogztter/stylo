import React, { useState, useEffect } from 'react'

import Reference from './Reference'
import bib2key from './bibliographe/CitationsFilter'

export default function BiblioReferenceList({ bib }) {
  const [bibTeXEntries, setBibTeXEntries] = useState([])

  useEffect(() => {
    console.log('Biblio#bibTeXEntries')
    setBibTeXEntries(bib2key(bib))
  }, [bib])

  return (
    <>
      {bibTeXEntries.map((entry, index) => (
        <Reference key={`ref-${entry.key}-${index}`} entry={entry} />
      ))}
    </>
  )
}
