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
import { DeletePopover } from '@features/oil-type/components/DeletePopover'

import * as schema from './schema.generated'
import * as types from '@app/types'

export function ListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState<types.OilTypeSort | undefined>()
  const [filter, setFilter] = useState<types.OilTypeFilter>({})
  const manyQuery = schema.useOilTypeListPageOilTypePaginateQuery({
    variables: {
      sort,
      filter,
      page,
      perPage
    },
    notifyOnNetworkStatusChange: true
  })
  const items = manyQuery?.data?.oiltypePaginate?.items || []
  const pageInfo = manyQuery?.data?.oiltypePaginate?.pageInfo || {
    page,
    perPage,
    total: 0
  }

  return (
    <MainTemplate
      title="Виды масел"
      headline={[
        {
          title: 'Виды масел'
        }
      ]}
      extra={
        <Link href="/oil-type/create" passHref>
          <AnchorButton icon="add" intent="primary">
            Добавить
          </AnchorButton>
        </Link>
      }
    >
      <Wall>
        <Table<schema.OilTypeListPageItemFragment>
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
                text="Название"
                filter="string"
                filterValue={filter.name || undefined}
                onFilterChange={(brand) =>
                  setFilter((prev) => ({ ...prev, brand }))
                }
                sortAsc={types.OilTypeSort.NameAsc}
                sortDesc={types.OilTypeSort.NameDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="name"
          />
          <Table.Column
            title="Стандартный"
            dataIndex="standard"
            render={(v) => v ? 'Да' : 'Нет'}
          />
          <Table.Column
            title="Действия"
            align="center"
            key="action"
            render={(record: schema.OilTypeListPageItemFragment) => (
              <ButtonGroup minimal>
                <Link href={`/oil-type/${record.id}`} passHref>
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
