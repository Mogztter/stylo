import React from 'react'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'

import Login from './Login'

const mapStateToProps = ({ logedIn }) => {
  return { logedIn }
}

const PrivateRoute = ({ logedIn, redirectTo, endpoints, children }) => {
  if (logedIn) {
    if (redirectTo) {
      navigate(redirectTo)
      return <></>
    }
    return <>{children}</>
  }
  return <Login endpoints={endpoints} />
}

export default connect(mapStateToProps)(PrivateRoute)
