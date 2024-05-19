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
import { DeletePopover } from '@features/lubricant/components/DeletePopover'

import * as schema from './schema.generated'
import * as types from '@app/types'

export function ListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState<types.LubricantSort | undefined>()
  const [filter, setFilter] = useState<types.LubricantFilter>({})
  const manyQuery = schema.useLubricantListPageLubricantPaginateQuery({
    variables: {
      sort,
      filter,
      page,
      perPage
    },
    notifyOnNetworkStatusChange: true
  })
  const items = manyQuery?.data?.lubricantPaginate?.items || []
  const pageInfo = manyQuery?.data?.lubricantPaginate?.pageInfo || {
    page,
    perPage,
    total: 0
  }

  return (
    <MainTemplate
      title="Смазочный материал"
      headline={[
        {
          title: 'Смазочный материал'
        }
      ]}
      extra={
        <Link href="/lubricant/create" legacyBehavior passHref>
          <AnchorButton icon="add" intent="primary">
            Добавить
          </AnchorButton>
        </Link>
      }
    >
      <Wall>
        <Table<schema.LubricantListPageItemFragment>
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
                text="Бренд"
                filter="string"
                filterValue={filter.brandEntity?.name || undefined}
                onFilterChange={(name) =>
                  setFilter((prev) => ({ ...prev, brandEntity: { name } }))
                }
                sortAsc={types.LubricantSort.BrandAsc}
                sortDesc={types.LubricantSort.BrandDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex={['brandEntity', 'name']}
          />
          <Table.Column
            title={
              <Table.Title
                text="Модель"
                filter="string"
                filterValue={filter.model || undefined}
                onFilterChange={(model) =>
                  setFilter((prev) => ({ ...prev, model }))
                }
                sortAsc={types.LubricantSort.ModelAsc}
                sortDesc={types.LubricantSort.ModelDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="model"
          />
          <Table.Column
            title={
              <Table.Title
                text="Вязкость"
                filter="string"
                filterValue={filter.viscosity || undefined}
                onFilterChange={(viscosity) =>
                  setFilter((prev) => ({ ...prev, viscosity }))
                }
                sortAsc={types.LubricantSort.ViscosityAsc}
                sortDesc={types.LubricantSort.ViscosityDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="viscosity"
          />
          <Table.Column
            title="Действия"
            align="center"
            key="action"
            render={(record: schema.LubricantListPageItemFragment) => (
              <ButtonGroup minimal>
                <Link href={`/lubricant/${record.id}`} legacyBehavior passHref>
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
