import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Reference from '../Write/Reference'

function Sidebar({ articleBibTeXEntries }) {
  return (
    <>
      {articleBibTeXEntries.slice(0,100).map((entry, index) => (
        <Reference key={`ref-${entry.key}-${index}`} entry={entry} />
      ))}
    </>
  )
}

const mapStateToProps = ({ articleBibTeXEntries }) => {
  return { articleBibTeXEntries }
}

const ConnectedSidebar = connect(mapStateToProps)(Sidebar)
export default ConnectedSidebar
