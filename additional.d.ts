declare module 'next/types/custom' {
  import { ServerResponse, IncomingMessage } from 'http'
  import { ParsedUrlQuery } from 'querystring'
  import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils'
  import { Redirect, GetStaticPropsContext } from 'next/types'
  import { Session } from 'next-iron-session'
  import { NormalizedCacheObject } from '@apollo/client'

  type GetServerSidePropsContext<
    Q extends ParsedUrlQuery = ParsedUrlQuery
  > = {
    req: IncomingMessage & {
      cookies: NextApiRequestCookies
      session?: Session
    }
    res: ServerResponse
    params?: Q
    query: ParsedUrlQuery
    preview?: boolean
    previewData?: any
    resolvedUrl: string
    locale?: string
    locales?: string[]
    defaultLocale?: string
  }

  type GetServerSidePropsResult<P> =
    | { props: P & { initialApolloState?: NormalizedCacheObject } }
    | { redirect: Redirect }
    | { notFound: true }

  type GetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
  > = (
    context: GetServerSidePropsContext<Q>
  ) => Promise<GetServerSidePropsResult<P>>

  type GetStaticPropsResult<P> =
    | { props: P & { initialApolloState?: NormalizedCacheObject }; revalidate?: number | boolean }
    | { redirect: Redirect; revalidate?: number | boolean }
    | { notFound: true }

  type GetStaticProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
  > = (context: GetStaticPropsContext<Q>) => Promise<GetStaticPropsResult<P>>
}
