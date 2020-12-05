import React from 'react'
import {connect} from "react-redux"

import styles from './Articles.module.scss'
import askGraphQL from '../helpers/graphQL'

const mapStateToProps = ({ sessionToken, activeUser }) => {
  return { sessionToken, activeUser }
}


const ConnectedArticleDelete = (props) => {

  const deleteArticle = async () => {
    try {
      const query = `mutation($user:ID!,$article:ID!){deleteArticle(article:$article,user:$user){ _id }}`
      const variables = { user: props.activeUser._id, article: props._id }
      await askGraphQL(props.endpoints.graphql, { query, variables }, 'Deleting Article')
      props.setNeedReload()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <button className={styles.delete} onDoubleClick={() => deleteArticle()}>Delete</button>
  )
}

const ArticleDelete = connect(
  mapStateToProps
)(ConnectedArticleDelete)

export default ArticleDelete
