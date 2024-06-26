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
import { DeletePopover } from '@features/vehicle/components/DeletePopover'

import * as schema from './schema.generated'
import * as types from '@app/types'

export function ListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState<types.VehicleSort | undefined>()
  const [filter, setFilter] = useState<types.VehicleFilter>({})
  const manyQuery = schema.useVehicleListPageVehiclePaginateQuery({
    variables: {
      sort,
      filter,
      page,
      perPage
    },
    notifyOnNetworkStatusChange: true
  })
  const items = manyQuery?.data?.vehiclePaginate?.items || []
  const pageInfo = manyQuery?.data?.vehiclePaginate?.pageInfo || {
    page,
    perPage,
    total: 0
  }

  return (
    <MainTemplate
      title="Техника"
      headline={[
        {
          title: 'Техника'
        }
      ]}
      extra={
        <Link href="/vehicle/create" legacyBehavior passHref>
          <AnchorButton icon="add" intent="primary">
            Добавить технику
          </AnchorButton>
        </Link>
      }
    >
      <Wall>
        <Table<schema.VehicleListPageItemFragment>
          data={items}
          rowKey={(record) => record.id}
          scroll={{
            x: 1400
          }}
          emptyText={
            <NonIdealState
              title={
                manyQuery.loading ? 'Техника загружается' : 'Техника не найдена'
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
                text="Модель"
                filter="string"
                filterValue={filter.model || undefined}
                onFilterChange={(model) =>
                  setFilter((prev) => ({ ...prev, model }))
                }
                sortAsc={types.VehicleSort.ModelAsc}
                sortDesc={types.VehicleSort.ModelDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="model"
          />
          <Table.Column
            title={
              <Table.Title
                text="Год выпуска"
                filter="string"
                filterValue={filter.releaseYear || undefined}
                onFilterChange={(releaseYear) =>
                  setFilter((prev) => ({ ...prev, releaseYear }))
                }
                sortAsc={types.VehicleSort.ReleaseYearAsc}
                sortDesc={types.VehicleSort.ReleaseYearDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="releaseYear"
          />
          <Table.Column
            title={
              <Table.Title
                text="Гос. номер"
                filter="string"
                filterValue={filter.stateNumber || undefined}
                onFilterChange={(stateNumber) =>
                  setFilter((prev) => ({ ...prev, stateNumber }))
                }
                sortAsc={types.VehicleSort.StateNumberAsc}
                sortDesc={types.VehicleSort.StateNumberDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="stateNumber"
          />
          <Table.Column
            title={
              <Table.Title
                text="Модель двигателя"
                filter="string"
                filterValue={filter.engineModel || undefined}
                onFilterChange={(engineModel) =>
                  setFilter((prev) => ({ ...prev, engineModel }))
                }
                sortAsc={types.VehicleSort.EngineModelAsc}
                sortDesc={types.VehicleSort.EngineModelDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="engineModel"
          />
          <Table.Column
            title={
              <Table.Title
                text="Владелец"
                filter="string"
                filterValue={filter.owner?.name || undefined}
                onFilterChange={(value) =>
                  setFilter((prev) => ({ ...prev, owner: { name: value } }))
                }
              />
            }
            dataIndex={['owner', 'name']}
          />
          <Table.Column
            title="Действия"
            align="center"
            key="action"
            render={(record: schema.VehicleListPageItemFragment) => (
              <ButtonGroup minimal>
                <Link href={`/vehicle/${record.id}`} legacyBehavior passHref>
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
