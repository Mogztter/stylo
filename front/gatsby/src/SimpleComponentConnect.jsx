import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ activeUser, applicationConfig }) => {
  return { activeUser, applicationConfig }
}

function ArticleEditorComponent ({ activeUser, applicationConfig }) {
  console.log('ArticleEditor')
  return <section></section>
}

const ArticleEditor = connect(mapStateToProps)(ArticleEditorComponent)
export default ArticleEditor
