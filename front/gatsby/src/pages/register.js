import React from 'react'

import App from '../layouts/App'
import Register from '../components/Register'

import '../styles/general.scss'
import {graphql} from 'gatsby'
import {getUserProfile} from '../helpers/userProfile'
import {store} from '../components/provider'

export default ({ data }) => {
  getUserProfile(data.site.siteMetadata.endpoints.backend).then(response => store.dispatch({ type: 'PROFILE', ...response }))
  return (<App layout="centered" title="Stylo | Register" siteMetadata={data.site.siteMetadata}>
    <Register/>
  </App>)
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
