import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from './Articles.module.scss'
import Loading from './Loading'

export default function ArticlePreview(props) {
  const { id, version } = props
  const { exportEndpoint } = useSelector(state => state.applicationConfig)
  const [isLoaded, setLoaded] = useState(false)
  const previewFrame = useRef()

  const url = version
    ? `${exportEndpoint}/api/v1/htmlVersion/${version}?preview=true`
    : `${exportEndpoint}/api/v1/htmlArticle/${id}?preview=true&annotate=true`

  useEffect(() => {
    previewFrame.current.addEventListener('load', () => setLoaded(true))
  }, [])

  return <>
    {!isLoaded && <Loading />}

    <iframe className={styles.previewContainer} ref={previewFrame} hidden={!isLoaded} src={url} />
  </>
}



