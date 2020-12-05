import React from 'react'

import App from '../layouts/App'
import Books from '../components/Books'
import PrivateRoute from '../components/PrivateRoute'

import '../styles/general.scss'
import {graphql} from 'gatsby'
import {getUserProfile} from '../helpers/userProfile'
import {store} from '../components/provider'

export default ({ data }) => {
  getUserProfile(data.site.siteMetadata.endpoints.backend).then(response => store.dispatch({ type: 'PROFILE', ...response }))
  return (
    <App layout="wrapped" title="Stylo | Books" siteMetadata={data.site.siteMetadata}>
      <PrivateRoute>
        <Books endpoints={data.site.siteMetadata.endpoints}/>
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
