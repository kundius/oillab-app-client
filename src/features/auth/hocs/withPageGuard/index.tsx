import React from 'react'
import Link from 'next/link'
import { NextPage } from 'next/types'

import * as types from '@app/types'
import * as schema from './schema.generated'
import styles from './styles.module.css'

type UserRole = 'Administrator' | 'Member'

interface WithPageGuardConfig {
  allowForRole?: UserRole[] | UserRole
  denyForGuest?: boolean
}

export function withPageGuard<
  P extends { [key: string]: any } = { [key: string]: any }
> (config: WithPageGuardConfig) {
  return (PageComponent: NextPage<P>): NextPage<P> => {
    const { allowForRole, denyForGuest = false } = config
  
    const WithPageGuard = (pageProps: P): React.ReactElement => {
      const queryResponse = schema.useAuthWithPageGuardQuery()
      const currentUser = queryResponse.data?.currentUser
  
      const hasAccess = () => {
        if (denyForGuest && !currentUser) {
          return false
        }
        if (allowForRole) {
          if (!currentUser) {
            return false
          }
          if (Array.isArray(allowForRole)) {
            return allowForRole.filter(type => currentUser.__typename === type).length > 0
          } else {
            return currentUser.__typename === allowForRole
          }
        }
        return true
      }

      if (queryResponse.loading) {
        return (
          <div className={styles.page}>
            Проверяем ваши полномочия. Ожидайте.
          </div>
        )
      }
  
      if (!hasAccess()) {
        return (
          <div className={styles.page}>
            Доступ к данной странице ограничен
            <Link href="/signin" passHref key="signin">
              <button>
                Вход
              </button>
            </Link>
          </div>
        )
      }
  
      return (
        <PageComponent {...pageProps} />
      )
    }
  
    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
      const displayName = PageComponent.displayName || PageComponent.name || 'Component'
      WithPageGuard.displayName = `withPageGuard(${displayName})`
    }
  
    return WithPageGuard
  }
}


