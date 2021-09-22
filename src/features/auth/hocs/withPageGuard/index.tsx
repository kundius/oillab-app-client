import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { AnchorButton, Button, Intent } from '@blueprintjs/core'

import { AuthTemplate } from '@features/auth/components/AuthTemplate'
import * as types from '@app/types'
import * as schema from './schema.generated'
import styles from './styles.module.css'

type UserRole = 'Administrator' | 'Member' | 'User'

interface WithPageGuardConfig {
  allowForRole?: UserRole[] | UserRole
  denyForGuest?: boolean
}

export function withPageGuard<
  P extends { [key: string]: any } = { [key: string]: any }
>(config: WithPageGuardConfig) {
  return (PageComponent: NextPage<P>): NextPage<P> => {
    const { allowForRole, denyForGuest = false } = config

    const WithPageGuard = (pageProps: P): React.ReactElement => {
      const queryResponse = schema.useAuthWithPageGuardQuery()
      const router = useRouter()
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
            return (
              allowForRole.filter((type) => currentUser.role === type)
                .length > 0
            )
          } else {
            return currentUser.role === allowForRole
          }
        }
        return true
      }

      if (queryResponse.loading) {
        return (
          <AuthTemplate title="Аутентификация">
            <div className={styles.wrapper}>
              <div className={styles.title}>
                Проверяем ваши полномочия. Ожидайте.
              </div>
            </div>
          </AuthTemplate>
        )
      }

      if (!hasAccess()) {
        return (
          <AuthTemplate title="Аутентификация">
            <div className={styles.wrapper}>
              <div className={styles.title}>
                Доступ к данной странице ограничен
              </div>
              <div className="flex items-center justify-between">
                {(router.pathname !== '/report' && router.pathname !== '/') && (
                  <Link href="/">
                    <AnchorButton className="ml-auto mr-auto">
                      На главную
                    </AnchorButton>
                  </Link>
                )}
                <Link href="/signin" passHref key="signin">
                  <Button intent={Intent.PRIMARY} className="ml-auto mr-auto">
                    Вход
                  </Button>
                </Link>
              </div>
            </div>
          </AuthTemplate>
        )
      }

      return <PageComponent {...pageProps} />
    }

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
      const displayName =
        PageComponent.displayName || PageComponent.name || 'Component'
      WithPageGuard.displayName = `withPageGuard(${displayName})`
    }

    return WithPageGuard
  }
}
