const protocol = process.env.PROTOCOL || 'http'
const domain = process.env.DOMAIN || 'localhost'

const backendEndpoint = process.env.GATSBY_STYLO_BACKEND_ENDPOINT
const graphqlEndpoint = process.env.GATSBY_GRAPHQL_ENDPOINT
const exportEndpoint = process.env.GATSBY_EXPORT_ENDPOINT
const processEndpoint = process.env.GATSBY_PROCESS_ENDPOINT
const humanIDRegisterEndpoint = process.env.GATSBY_HUMAN_ID_REGISTER_ENDPOINT

console.log('gatsby-config')

module.exports = {
  siteMetadata: {
    title: 'Stylo',
    siteUrl: `${protocol}://${domain}`,
    description: 'Stylo, online text editor for scholars',
    image: '/favicon.ico',
    endpoints: {
      backend: backendEndpoint || 'http://localhost:3030',
      graphql: graphqlEndpoint || 'http://localhost:3030/graphql',
      export: exportEndpoint || 'http://localhost:3060',
      process: processEndpoint || 'http://localhost:9090',
      humanIdRegister: humanIDRegisterEndpoint || 'https://auth-test.huma-num.fr/register?service=http://localhost:3030/authorization-code/callback'
    }
  },
  plugins: [`gatsby-plugin-sass`, `gatsby-plugin-react-helmet`]
}
