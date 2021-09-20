import React from 'react'
import Link from 'next/link'
import { Icon } from '@blueprintjs/core'

import styles from './styles.module.css'

export interface PageHeadlineProps {
  items: {
    href?: string
    title: string
  }[]
}

export const PageHeadline = ({
  items
}: PageHeadlineProps) => {
  const nodes = items.map(item => {
    if (item.href) {
      return (
        <Link href={item.href} passHref key={item.href}>
          <a className={styles.headlineLink}>
            {item.title}
          </a>
        </Link>
      )
    }
    return <div className={styles.headlineTitle}>{item.title}</div>
  })
  return (
    <div className={styles.headline}>
      {nodes.reduce((result, item, index, array) => {
        result.push(item)
        if (index !== array.length - 1) {
          result.push((
            <span className={styles.headlineChevron}>
              <Icon icon="chevron-right" />
            </span>
          ))
        }
        return result
      }, [] as React.ReactNode[])}
    </div>
  )
}
