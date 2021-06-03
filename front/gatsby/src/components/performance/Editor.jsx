import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Sidebar from './Sidebar'
import { getArticle } from './ArticleService'

function Editor({ applicationConfig }) {
  const { articleId } = useParams()
  const [expanded, setExpanded] = useState(false)
  const [bib, setBib] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Editor#useEffect')
    ;(async () => {
      try {
        const data = await getArticle(articleId, applicationConfig)
        const live = data.article.live
        dispatch({ type: 'UPDATE_ARTICLE_BIB', bib: live.bib })
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])
  return (
    <section>
      <p>Editor</p>
      <button onClick={() => setExpanded(!expanded)}>Show</button>
      {expanded && <Sidebar bib={bib} />}
    </section>
  )
}

const mapStateToProps = ({ applicationConfig }) => {
  return { applicationConfig }
}

const ConnectedEditor = connect(mapStateToProps)(Editor)
export default ConnectedEditor
