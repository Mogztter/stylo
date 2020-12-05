import React from 'react'

import App from '../layouts/App'
import Articles from '../components/Articles'
import PrivateRoute from '../components/PrivateRoute'

import '../styles/general.scss'

export default ({ props }) => {
  console.log(props)
  const data = {
    site: {
      siteMetadata: {
        endpoints: {}
      }
    }
  }
  return (
    <App title="Stylo | Articles" layout="wrapped" siteMetadata={data.site.siteMetadata}>
      <PrivateRoute>
        <Articles endpoints={data.site.siteMetadata.endpoints}/>
      </PrivateRoute>
    </App>
  )
}
