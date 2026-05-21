import {
  AnchorButton,
  Button,
  ButtonGroup,
  Divider,
  Intent,
  NonIdealState,
  Spinner
} from '@blueprintjs/core'
import Link from 'next/link'
import { useState } from 'react'

import { Pagination } from '@components/Pagination'
import { Table } from '@components/Table'
import { Wall } from '@components/Wall'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DeletePopover } from '@features/brand/DeletePopover'

import * as types from '@app/types'
import * as schema from './schema.generated'

export function ListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState<types.BrandSort | undefined>()
  const [filter, setFilter] = useState<types.BrandFilter>({})
  const manyQuery = schema.useBrand_ListPage_Query({
    variables: {
      sort,
      filter,
      page,
      perPage
    },
    notifyOnNetworkStatusChange: true
  })
  const items = manyQuery?.data?.brandPaginate?.items || []
  const pageInfo = manyQuery?.data?.brandPaginate?.pageInfo || {
    page,
    perPage,
    total: 0
  }

  return (
    <MainTemplate
      title="Бренд"
      headline={[
        {
          title: 'Бренд'
        }
      ]}
      extra={
        <Link href="/brand/create" legacyBehavior passHref>
          <AnchorButton icon="add" intent="primary">
            Добавить
          </AnchorButton>
        </Link>
      }
    >
      <Wall>
        <Table<schema.Brand_ListPage_Fragment>
          data={items}
          rowKey={(record) => record.id}
          scroll={{
            x: 1400
          }}
          emptyText={
            <NonIdealState
              title={manyQuery.loading ? 'Загружается' : 'Не найдено'}
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
                onFilterChange={(name) =>
                  setFilter((prev) => ({ ...prev, name }))
                }
              />
            }
            dataIndex="name"
          />
          <Table.Column
            title="Действия"
            align="center"
            key="action"
            width={160}
            render={(record: schema.Brand_ListPage_Fragment) => (
              <ButtonGroup minimal>
                <Link href={`/brand/${record.id}`} legacyBehavior passHref>
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
