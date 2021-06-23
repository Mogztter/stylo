import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import App from '../layouts/App'

const mapStateToProps = ({ logedIn, applicationConfig }) => {
  return { logedIn, applicationConfig }
}

function PrivateRoute ({ logedIn, applicationConfig, children }) {
  if (logedIn && applicationConfig) {
    console.log('go')
    return <>{children}</>
  }

  return (
    <App layout="centered" header={false}>
      <Login />
    </App>
  )
}

export default connect(mapStateToProps)(PrivateRoute)
