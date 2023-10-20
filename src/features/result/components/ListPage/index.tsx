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
import { Pagination } from '@components/Pagination'
import { Wall } from '@components/Wall'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DeletePopover } from '@features/result/components/DeletePopover'

import * as schema from './schema.generated'
import * as types from '@app/types'

export function ListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState<types.ResultSort | undefined>()
  const [filter, setFilter] = useState<types.ResultFilter>({})
  const manyQuery = schema.useResultListPageResultPaginateQuery({
    variables: {
      sort,
      filter,
      page,
      perPage
    },
    notifyOnNetworkStatusChange: true
  })
  const items = manyQuery?.data?.resultPaginate?.items || []
  const pageInfo = manyQuery?.data?.resultPaginate?.pageInfo || {
    page,
    perPage,
    total: 0
  }

  return (
    <MainTemplate
      title="Результаты"
      headline={[
        {
          title: 'Результаты'
        }
      ]}
      extra={
        <Link href="/result/create" passHref>
          <AnchorButton icon="add" intent="primary">
            Добавить
          </AnchorButton>
        </Link>
      }
    >
      <Wall>
        <Table<schema.ResultListPageItemFragment>
          data={items}
          rowKey={(record) => record.id}
          scroll={{
            x: 1400
          }}
          emptyText={
            <NonIdealState
              title={
                manyQuery.loading ? 'Загружается' : 'Не найдено'
              }
              icon={manyQuery.loading ? <Spinner /> : 'warning-sign'}
            />
          }
          footer={() => (
            <div className="flex justify-end">
              <Pagination
                onChange={(current, pageSize) => {
                  setPage(current)
                  setPerPage(pageSize)
                }}
                pageSize={pageInfo.perPage}
                current={pageInfo.page}
                total={pageInfo.total}
              />
            </div>
          )}
        >
          <Table.Column
            title={
              <Table.Title
                text="Номер бланка"
                filter="string"
                filterValue={filter.number || undefined}
                onFilterChange={(number) =>
                  setFilter((prev) => ({ ...prev, number }))
                }
              />
            }
            dataIndex="number"
          />
          <Table.Column<schema.ResultListPageItemFragment>
            title="Вид масла"
            dataIndex="oilType"
            render={(row) => row.name}
          />
          <Table.Column
            width={180}
            title="Действия"
            align="center"
            key="action"
            render={(record: schema.ResultListPageItemFragment) => (
              <ButtonGroup minimal>
                <Link href={`/result/${record.id}`} passHref>
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
