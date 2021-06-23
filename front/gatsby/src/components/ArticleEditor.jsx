import React, { useEffect, useRef, useState } from 'react'
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux'

import ArticleVersionService from '../services/ArticleVersion'
import ArticleTextEditor from './ArticleTextEditor'
import styles from './Write/write.module.scss'

const mapStateToProps = ({ activeUser, applicationConfig }) => {
  return { activeUser, applicationConfig }
}

function ArticleEditorComponent ({ id: articleId, version: currentVersion, activeUser, applicationConfig }) {
  /*
  const { activeUser, applicationConfig } = useSelector(({ activeUser }) => ({
    activeUser,
    applicationConfig
  }), shallowEqual)
   */
  /*
  console.log(`ArticleEditor(articleId: ${articleId}, currentVersion: ${currentVersion}, activeUser: ${JSON.stringify(activeUser)}, applicationConfig: ${JSON.stringify(applicationConfig)})`)
   */
  console.log('ArticleEditor')
  //const dispatch = useDispatch()
  //const userId = activeUser && activeUser._id
  //const articleVersionService = new ArticleVersionService(applicationConfig)
  /*
  useEffect(() => {
    console.log({articleId, currentVersion})
    ;(async () => {
      try {
        const data = await articleVersionService.getArticle({
          user: userId,
          article: articleId,
          version: currentVersion
        })
        console.log({ data })
        // FIXME: initial article text to event store
        //dispatch({ type: 'SET_ARTICLE_TEXT', articleText: data.article.live.md })
      } catch (err) {
        console.error(`Something went wrong while getting article with id: ${articleId}`, err)
      }
    })()
  }, [currentVersion, articleId])
   */
  return (
    <section>
      <article>
        <span></span>
      </article>
    </section>
  )
}

const ArticleEditor = connect(mapStateToProps)(ArticleEditorComponent)
export default ArticleEditor
