import { useMemo } from 'react'
import { ApolloClient, ApolloLink, GraphQLRequest, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import merge from 'deepmerge'
import Cookies from 'universal-cookie'
import { GetServerSidePropsContext } from 'next/types/custom'

import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import getRuntimeConfig from '@app/utils/getRuntimeConfig'

interface ContextApolloClient extends ApolloClient<NormalizedCacheObject> {
  toJSON?: () => null
}

interface ApolloParams {
  initialState?: NormalizedCacheObject | null
  context?: GetServerSidePropsContext | null
}

const { publicRuntimeConfig } = getRuntimeConfig()

let apolloClient: ContextApolloClient | null = null

export function createLink (params: ApolloParams) {
  const httpLink = new HttpLink({ uri: publicRuntimeConfig.GRAPHQL_URL })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const authLink = setContext(async (_: GraphQLRequest, { headers }) => {
    let token: string | null = null
    let cookies: Cookies | null = null

    if (params.context) {
      cookies = new Cookies(params.context.req.headers.cookie)
    }
    if (typeof window !== 'undefined') {
      cookies = new Cookies(document.cookie)
    }
    if (cookies) {
      token = cookies.get('token')
    }

    // return the headers to the context so httpLink can read them
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  return errorLink.concat(authLink.concat(httpLink))
}

export function createApolloClient (
  params: ApolloParams = {}
) {
  const cache = new InMemoryCache({
    possibleTypes: {
      DefaultError: ['NotFoundError', 'PermissionDeniedError', 'RuntimeError', 'ValidationError', 'SignUpValidationError']
    }
  })

  const link = createLink(params)

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache
  })
}

export function initializeApollo (
  params: ApolloParams = {}
) {
  const _apolloClient = apolloClient ?? createApolloClient(params)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (params.initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(params.initialState, existingCache, {
      arrayMerge: (target, source) => source
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo (
  params: ApolloParams = {}
) {
  return useMemo(() => initializeApollo(params), [params])
}
