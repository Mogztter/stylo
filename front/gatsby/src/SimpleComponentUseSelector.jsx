import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'

export default function ArticleEditor () {
  console.log('ArticleEditor')
  const { activeUser, applicationConfig } = useSelector(({ activeUser, applicationConfig }) => ({
    activeUser,
    applicationConfig
  }), shallowEqual)
  return <section></section>
}
