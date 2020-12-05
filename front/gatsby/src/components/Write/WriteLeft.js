import React, {useMemo, useState} from 'react'

import styles from './writeLeft.module.scss'
import Stats from './Stats'
import Biblio from './Biblio'
import Sommaire from './Sommaire'
import Versions from './Versions'
import Edit from './Edit'
import bib2key from './bibliographe/CitationsFilter'

export default (props) => {
  const bibTeXEntries = useMemo(() => bib2key(props.bib), [props.bib])

  const [expanded, setExpanded] = useState(true)

  return (
    <nav className={`${expanded ? styles.expandleft : styles.retractleft}`}>
      <nav
        onClick={() => setExpanded(!expanded)}
        className={expanded ? styles.close : styles.open}
      >
        {expanded ? 'close' : 'open'}
      </nav>
      {expanded && (
        <>
          <div>
            <header>
              <h1>{props.article.title}</h1>
              <h2>by {props.article.owners.join(', ')}</h2>
            </header>
            <Edit {...props} />
            <Versions {...props} />
            <Sommaire {...props} />
            <Biblio bibTeXEntries={bibTeXEntries} {...props} />
            <Stats md={props.md}/>
          </div>
        </>
      )}
    </nav>
  )
}
