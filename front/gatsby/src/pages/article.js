import React from 'react'
import {Location, Router} from '@reach/router'
import Write from '../components/Write/Write'
import PrivateRoute from '../components/PrivateRoute'
import App from '../layouts/App'
import {graphql} from 'gatsby'
import {getUserProfile} from '../helpers/userProfile'
import {store} from '../components/provider'

export default (props) => {
  getUserProfile(props.data.site.siteMetadata.endpoints.backend).then(response => store.dispatch({ type: 'PROFILE', ...response }))
  return (
    <Location>
      {({ location }) => (
        <Router location={location} className="router">
          <ArticleID path="/article/:id/version/:version" {...props}/>
          <ArticleID path="/article/:id" {...props}/>
          <ArticleID path="/article/:id/version/:version/compare/:compareTo" {...props}/>
          <ArticleID path="/article/:id/compare/:compareTo" {...props}/>
        </Router>
      )}
    </Location>
  )
}

const ArticleID = (props) => {
  return (
    <App layout="fullPage" siteMetadata={props.data.site.siteMetadata}>
      <PrivateRoute>
        <Write {...props} endpoints={props.data.site.siteMetadata.endpoints}/>
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
