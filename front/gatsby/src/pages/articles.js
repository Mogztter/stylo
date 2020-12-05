import React from 'react'

import App from '../layouts/App'
import Articles from '../components/Articles'
import PrivateRoute from '../components/PrivateRoute'

import '../styles/general.scss'
import {graphql} from 'gatsby'
import {getUserProfile} from '../helpers/userProfile'
import {store} from '../components/provider'

export default ({ data }) => {
  getUserProfile(data.site.siteMetadata.endpoints.backend).then(response => store.dispatch({ type: 'PROFILE', ...response }))
  return (
    <App title="Stylo | Articles" layout="wrapped" siteMetadata={data.site.siteMetadata}>
      <PrivateRoute>
        <Articles endpoints={data.site.siteMetadata.endpoints}/>
      </PrivateRoute>
    </App>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        endpoints { 
          backend,
          graphql,
          export,
          process,
          humanIdRegister
        }
      }
    }
  }
`
