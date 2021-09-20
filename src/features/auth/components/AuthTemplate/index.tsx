import React from 'react'
import { Helmet } from 'react-helmet'

import styles from './styles.module.css'

export const AuthTemplate = ({
  children,
  title
}: {
  children: React.ReactNode
  title?: string
}) => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <meta charSet="utf-8" />
        {title && <title>{title}</title>}
      </Helmet>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}
