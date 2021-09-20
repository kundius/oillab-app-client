import React from 'react'
import Link from 'next/link'
import { Props, Menu, MenuDivider, MenuItem, Button, Icon, Intent, PopoverProps, Popover, Position, ButtonGroup, Divider } from "@blueprintjs/core";
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { Container } from '@app/components/Container'
import { useLogout } from '@features/app/hooks/useLogout'

import * as schema from './schema.generated'
import styles from './styles.module.css'

export const Header = () => {
  const { data: { currentUser } = {} } = schema.useAppHeaderCurrentUserQuery()
  const [logout] = useLogout()
  const router = useRouter()
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" passHref>
            <a className="flex items-center hover:no-underline hover:text-current">
              <Icon icon="database" size={40} />
              <span className="flex flex-col ml-2">
                <span className="font-bold text-xl leading-6">ООО "РТК"</span>
                <span className="italic opacity-80 tracking-wider">База данных</span>
              </span>
            </a>
          </Link>
          <div className="mr-auto ml-12">
            <ul className="flex space-x-4">
              <li>
                <Link href="/report" passHref>
                  <a className={classNames(styles.link, {
                    [styles.linkActive]: router.pathname.startsWith('/report')
                  })}>
                    Отчеты
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/users" passHref>
                  <a className={classNames(styles.link, {
                    [styles.linkActive]: router.pathname.startsWith('/users')
                  })}>
                    Пользователи
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/vehicle" passHref>
                  <a className={classNames(styles.link, {
                    [styles.linkActive]: router.pathname.startsWith('/vehicle')
                  })}>
                    Техника
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <div className="text-base tracking-wide mr-2 text-current">
              Administrator
            </div>
            <a className={styles.logout}>
              <Icon icon="log-out" />
            </a>
          </div>
          {currentUser && (
            <Button icon="log-out" minimal onClick={() => logout()} />
          )}
          {/* {currentUser && (
            <Popover
              content={menu}
              position={Position.BOTTOM_RIGHT}
            >
              <a className="flex items-center gap-1 text-black" onClick={e => e.preventDefault()}>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-300">
                  {currentUser?.avatar?.small && (
                    <img src={currentUser.avatar.small} />
                  )}
                </span>
                <Icon icon="chevron-down" />
              </a>
            </Popover>
          )} */}
        </div>
      </Container>
    </div>
  )
}
