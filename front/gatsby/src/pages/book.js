import React from 'react'
import {Location, Router} from '@reach/router'
import App from '../layouts/App'
import WriteBook from '../components/WriteBook'
import PrivateRoute from '../components/PrivateRoute'
import {graphql} from 'gatsby'
import {getUserProfile} from '../helpers/userProfile'
import {store} from '../components/provider'

export default ({ data }) => {
  getUserProfile(data.site.siteMetadata.endpoints.backend).then(response => store.dispatch({ type: 'PROFILE', ...response }))
  return (
    <Location>
      {({ location }) => (
        <Router location={location} className="router">
          <BookID path="/book/:id/chapter/:chapter"/>
          <BookID path="/book/:id"/>
        </Router>
      )}
    </Location>
  )
}

const BookID = (props) => {
  return (
    <App layout="fullPage">
      <PrivateRoute>
        <WriteBook {...props} />
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
