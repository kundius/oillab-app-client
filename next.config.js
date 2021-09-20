const { parsed: localEnv } = require('dotenv').config()

const CLIENT_URL = localEnv.CLIENT_URL ? localEnv.CLIENT_URL : 'http://localhost:3000'
const API_URL = localEnv.API_URL ? localEnv.API_URL : 'http://localhost:4000'
const GRAPHQL_URL = localEnv.GRAPHQL_URL ? localEnv.GRAPHQL_URL : 'http://localhost:4000/graphql'

module.exports = {
  serverRuntimeConfig: {
    mySecret: 'secret'
  },
  publicRuntimeConfig: {
    CLIENT_URL,
    API_URL,
    GRAPHQL_URL
  }
}
