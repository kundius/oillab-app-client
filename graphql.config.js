const { parsed: localEnv } = require('dotenv').config()

const GRAPHQL_URL = localEnv.GRAPHQL_URL ? localEnv.GRAPHQL_URL : 'http://localhost:4000/graphql'

module.exports = {
  schemaPath: GRAPHQL_URL
}
