import getConfig from 'next/config'

interface PublicRuntimeConfig {
  CLIENT_URL: string
  API_URL: string
  GRAPHQL_URL: string
}

interface ServerRuntimeConfig {
  [key: string]: string
}

interface Config {
  serverRuntimeConfig: ServerRuntimeConfig,
  publicRuntimeConfig: PublicRuntimeConfig
}

const getRuntimeConfig = (): Config => getConfig() as Config

export default getRuntimeConfig
