import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const StaticConfiguration = () => {
  const data = useStaticQuery(graphql`
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
  `)
  return (
    <h1>
      Querying title from NonPageComponent: {data.site.siteMetadata.title}{" "}
    </h1>
  )
}
export default StaticConfiguration
