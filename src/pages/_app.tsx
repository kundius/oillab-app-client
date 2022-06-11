import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import { useApollo } from '@app/lib/apolloClient'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import '@components/GlobalStyle/globals.css'
import '@components/Table/styles.css'
import '@components/Pagination/styles.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({
    initialState: pageProps.initialApolloState
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('webfontloader').then(({ default: WebFont }) => {
        WebFont.load({
          google: {
            families: ['Roboto:300,400,400i,600,700&amp;subset=cyrillic']
          }
        })
      })
    }
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
