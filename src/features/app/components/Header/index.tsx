import React from 'react'
import Link from 'next/link'
import { Icon } from '@blueprintjs/core'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { Container } from '@app/components/Container'
import { useLogout } from '@features/app/hooks/useLogout'
import { useHasRole } from '@app/features/app/hooks/useHasRole'

import * as schema from './schema.generated'
import * as types from '@app/types'
import styles from './styles.module.css'

export const Header = () => {
  const { data: { currentUser } = {} } = schema.useAppHeaderCurrentUserQuery()
  const [logout] = useLogout()
  const router = useRouter()
  const isAdministrator = useHasRole(types.UserRole.Administrator)
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <Link
            href="/"
            className="flex items-center hover:no-underline hover:text-current"
          >
            <Icon icon="database" size={40} />
            <span className="flex flex-col ml-2">
              <span className="font-bold text-xl leading-6">ООО "ОЙЛ-ЛАБ"</span>
              <span className="italic opacity-80 tracking-wider">
                База данных
              </span>
            </span>
          </Link>
          <div className="mr-auto ml-12">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/report"
                  className={classNames(styles.link, {
                    [styles.linkActive]: router.pathname.startsWith('/report')
                  })}
                >
                  Отчеты
                </Link>
              </li>
              {isAdministrator && (
                <li>
                  <Link
                    href="/users"
                    className={classNames(styles.link, {
                      [styles.linkActive]: router.pathname.startsWith('/users')
                    })}
                  >
                    Пользователи
                  </Link>
                </li>
              )}
              {isAdministrator && (
                <li>
                  <Link
                    href="/vehicle"
                    className={classNames(styles.link, {
                      [styles.linkActive]:
                        router.pathname.startsWith('/vehicle')
                    })}
                  >
                    Техника
                  </Link>
                </li>
              )}
              {isAdministrator && (
                <li>
                  <Link
                    href="/lubricant"
                    className={classNames(styles.link, {
                      [styles.linkActive]:
                        router.pathname.startsWith('/lubricant')
                    })}
                  >
                    Смазочный материал
                  </Link>
                </li>
              )}
              {isAdministrator && (
                <li>
                  <Link
                    href="/result"
                    className={classNames(styles.link, {
                      [styles.linkActive]: router.pathname.startsWith('/result')
                    })}
                  >
                    Внести результат
                  </Link>
                </li>
              )}
              {isAdministrator && (
                <li>
                  <Link
                    href="/oil-type"
                    className={classNames(styles.link, {
                      [styles.linkActive]:
                        router.pathname.startsWith('/oil-type')
                    })}
                  >
                    Вид масел
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {currentUser && (
            <div className="flex items-center">
              <div className="text-base tracking-wide mr-2 text-current">
                {currentUser.name}
              </div>
              <button
                className={styles.logout}
                onClick={() => logout()}
                type="button"
              >
                <Icon icon="log-out" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
