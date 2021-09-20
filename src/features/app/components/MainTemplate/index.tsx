import React from 'react'
import { Helmet } from 'react-helmet'

import { Header } from '@features/app/components/Header'
import { Container } from '@app/components/Container'
import { PageHeadline, PageHeadlineProps } from '@features/app/components/PageHeadline'

import styles from './styles.module.css'

export type MainTemplateProps = React.PropsWithChildren<{
  headline: PageHeadlineProps['items']
  extra?: React.ReactNode
  title: string
}>

export const MainTemplate = ({
  children,
  headline,
  extra,
  title
}: MainTemplateProps) => {
  return (
    <div className={styles.layout}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <div className={styles.main}>
        <Container>
          <div className={styles.headline}>
            <PageHeadline items={headline} />
            {extra && (
              <div>
                {extra}
              </div>
            )}
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </Container>
      </div>
    </div>
  )
}
