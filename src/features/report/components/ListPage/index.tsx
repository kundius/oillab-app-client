import React, { useState } from 'react'
import Link from 'next/link'
import {
  ButtonGroup,
  Button,
  AnchorButton,
  Divider,
  Intent,
  NonIdealState,
  Spinner,
  Icon
} from '@blueprintjs/core'

import { Table } from '@components/Table'
import { Wall } from '@components/Wall'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DeletePopover } from '@features/report/components/DeletePopover'

import * as schema from './schema.generated'
import * as types from '@app/types'

export function ListPage() {
  const [sort, setSort] = useState<types.ReportSort | undefined>(
    types.ReportSort.NumberAsc
  )
  const [filter, setFilter] = useState<types.ReportFilter>({})
  const manyQuery = schema.useReportListPageReportPaginateQuery({
    variables: {
      sort,
      filter
    },
    notifyOnNetworkStatusChange: true
  })
  const items = manyQuery?.data?.reportPaginate?.items || []
  return (
    <MainTemplate
      title="Отчеты"
      headline={[
        {
          title: 'Отчеты'
        }
      ]}
      extra={
        <Link href="/report/create" passHref>
          <AnchorButton icon="add">Добавить отчет</AnchorButton>
        </Link>
      }
    >
      <Wall>
        <Table<schema.ReportListPageItemFragment>
          data={items}
          rowKey={(record) => record.id}
          scroll={{
            x: 1400
          }}
          emptyText={
            <NonIdealState
              title={
                manyQuery.loading ? 'Отчеты загружаются' : 'Отчеты не найдены'
              }
              icon={manyQuery.loading ? <Spinner /> : 'warning-sign'}
            />
          }
        >
          <Table.Column
            title={
              <Table.Title
                text="Номер"
                filter="number"
                filterValue={filter.number || undefined}
                onFilterChange={(number) =>
                  setFilter((prev) => ({ ...prev, number }))
                }
                sortAsc={types.ReportSort.NumberAsc}
                sortDesc={types.ReportSort.NumberDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="number"
          />
          <Table.Column
            title={
              <Table.Title
                text="Клиент"
                filter="string"
                filterValue={filter.clientName || undefined}
                onFilterChange={(clientName) =>
                  setFilter((prev) => ({ ...prev, clientName }))
                }
              />
            }
            dataIndex={['client', 'name']}
          />
          <Table.Column
            title={
              <Table.Title
                text="Модель техники"
                filter="string"
                filterValue={filter.vehicleModel || undefined}
                onFilterChange={(vehicleModel) =>
                  setFilter((prev) => ({ ...prev, vehicleModel }))
                }
              />
            }
            dataIndex={['vehicle', 'model']}
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
                sortAsc={types.ReportSort.StateNumberAsc}
                sortDesc={types.ReportSort.StateNumberDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="stateNumber"
          />
          <Table.Column
            title={
              <Table.Title
                text="Дата пробы"
                filter="date"
                filterValue={filter.sampledAt || undefined}
                onFilterChange={(sampledAt) =>
                  setFilter((prev) => ({ ...prev, sampledAt }))
                }
                sortAsc={types.ReportSort.SampledAtAsc}
                sortDesc={types.ReportSort.SampledAtDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="sampledAt"
            render={(value) => new Date(value).toLocaleDateString()}
          />
          <Table.Column
            title={
              <Table.Title
                text="Общий пробег"
                filter="string"
                filterValue={filter.totalMileage || undefined}
                onFilterChange={(totalMileage) =>
                  setFilter((prev) => ({ ...prev, totalMileage }))
                }
                sortAsc={types.ReportSort.TotalMileageAsc}
                sortDesc={types.ReportSort.TotalMileageDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="totalMileage"
          />
          <Table.Column
            title={
              <Table.Title
                text="Пробег на смазочном материале"
                filter="string"
                filterValue={filter.lubricantMileage || undefined}
                onFilterChange={(lubricantMileage) =>
                  setFilter((prev) => ({ ...prev, lubricantMileage }))
                }
                sortAsc={types.ReportSort.LubricantMileageAsc}
                sortDesc={types.ReportSort.LubricantMileageDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="lubricantMileage"
          />
          <Table.Column
            title={
              <Table.Title
                text="Узел пробоотбора"
                filter="string"
                filterValue={filter.samplingNodes || undefined}
                onFilterChange={(samplingNodes) =>
                  setFilter((prev) => ({ ...prev, samplingNodes }))
                }
                sortAsc={types.ReportSort.SamplingNodesAsc}
                sortDesc={types.ReportSort.SamplingNodesDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="samplingNodes"
          />
          <Table.Column
            title={
              <Table.Title
                text="Смазочный материал"
                filter="string"
                filterValue={filter.lubricant || undefined}
                onFilterChange={(lubricant) =>
                  setFilter((prev) => ({ ...prev, lubricant }))
                }
                sortAsc={types.ReportSort.LubricantAsc}
                sortDesc={types.ReportSort.LubricantDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="lubricant"
          />
          <Table.Column
            title="Результат лаборатории"
            dataIndex="laboratoryResult"
            render={(value) =>
              value ? (
                <a href={value.url} target="_blank">
                  <Icon icon="cloud-download" />
                </a>
              ) : undefined
            }
          />
          <Table.Column
            title="Экспресс результат лаборатории"
            dataIndex="expressLaboratoryResult"
            render={(value) =>
              value ? (
                <a href={value.url} target="_blank">
                  <Icon icon="cloud-download" />
                </a>
              ) : undefined
            }
          />
          <Table.Column title="Примечание" dataIndex="note" />
          <Table.Column
            title="Действия"
            align="center"
            key="action"
            render={(record: schema.ReportListPageItemFragment) => (
              <ButtonGroup minimal>
                <Link href={`/report/${record.id}`} passHref>
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
