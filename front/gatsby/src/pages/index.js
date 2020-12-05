import React from 'react'
import {graphql} from "gatsby"

import App from '../layouts/App'
import PrivateRoute from '../components/PrivateRoute'
import { store } from "../components/provider"
import { getUserProfile } from "../helpers/userProfile";
import '../styles/general.scss'

const Index = ({ data }) => {
  getUserProfile(data.site.siteMetadata.endpoints.backend).then(response => store.dispatch({ type: 'PROFILE', ...response }))
  return (
    <App layout="centered" header={false} siteMetadata={data.site.siteMetadata}>
      <PrivateRoute redirectTo="/articles" endpoints={data.site.siteMetadata.endpoints}/>
    </App>
  )
}

export default Index

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
