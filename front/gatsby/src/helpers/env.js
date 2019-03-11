console.log(process.env.GATSBY_GRAPHQL_ENDPOINT)
const env = {
  GRAPHQL_ENDPOINT: process.env.GATSBY_GRAPHQL_ENDPOINT || "https://graphql.stylo.14159.ninja/graphql",
  EXPORT_ENDPOINT: process.env.GATSBY_EXPORT_ENDPOINT || "https://stylo.14159.ninja",
  PROCESS_ENDPOINT: process.env.GATSBY_PROCESS_ENDPOINT || "https://stylo-export.ecrituresnumeriques.ca"
}

export default env;