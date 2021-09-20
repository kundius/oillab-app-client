import React, { useState } from 'react'
import Link from 'next/link'
import {
  ButtonGroup,
  Button,
  AnchorButton,
  Divider,
  Intent,
  NonIdealState,
  Spinner
} from '@blueprintjs/core'

import { Table } from '@components/Table'
import { Wall } from '@components/Wall'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DeletePopover } from '@features/users/components/DeletePopover'

import * as schema from './schema.generated'
import * as types from '@app/types'

export function ListPage() {
  const [sort, setSort] = useState<types.UserSort>(types.UserSort.NameAsc)
  const [filter, setFilter] = useState<types.UserFilter>({})
  const manyQuery = schema.useUsersListPageUserPaginateQuery({
    variables: {
      sort,
      filter
    },
    notifyOnNetworkStatusChange: true
  })
  const items = manyQuery?.data?.userPaginate?.items || []

  return (
    <MainTemplate
      title="Пользователи"
      headline={[
        {
          title: 'Пользователи'
        }
      ]}
      extra={
        <Link href="/users/create" passHref>
          <AnchorButton icon="add">Добавить пользователя</AnchorButton>
        </Link>
      }
    >
      <Wall>
        <Table<schema.UsersListPageItemFragment>
          data={items}
          rowKey={(record) => record.id}
          emptyText={
            <NonIdealState
              title={
                manyQuery.loading
                  ? 'Пользователи загружаются'
                  : 'Пользователи не найдены'
              }
              icon={manyQuery.loading ? <Spinner /> : 'warning-sign'}
            />
          }
        >
          <Table.Column
            dataIndex="name"
            title={
              <Table.Title
                text="Имя"
                filter="string"
                filterValue={filter.name || undefined}
                onFilterChange={(name) =>
                  setFilter((prev) => ({ ...prev, name }))
                }
                sortAsc={types.UserSort.NameAsc}
                sortDesc={types.UserSort.NameDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
          />
          <Table.Column
            title={
              <Table.Title
                text="E-mail"
                filter="string"
                filterValue={filter.email || undefined}
                onFilterChange={(email) =>
                  setFilter((prev) => ({ ...prev, email }))
                }
                sortAsc={types.UserSort.EmailAsc}
                sortDesc={types.UserSort.EmailDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="email"
          />
          <Table.Column
            title="Действия"
            align="center"
            key="action"
            render={(record: schema.UsersListPageItemFragment) => (
              <ButtonGroup minimal>
                <Link href={`/users/${record.id}`} passHref>
                  <AnchorButton icon="edit" small />
                </Link>
                <Divider />
                <DeletePopover id={record.id}>
                  {({ isLoading }) => (
                    <Button
                      icon="trash"
                      small
                      intent={Intent.DANGER}
                      loading={isLoading}
                    />
                  )}
                </DeletePopover>
              </ButtonGroup>
            )}
          />
        </Table>
      </Wall>
    </MainTemplate>
  )
}
