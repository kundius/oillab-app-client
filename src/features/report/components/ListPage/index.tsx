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
  Icon,
  NumericInput,
  InputGroup
} from '@blueprintjs/core'
import { DateFormatProps, DateInput } from '@blueprintjs/datetime'

import { Table } from '@components/Table'
import { Pagination } from '@components/Pagination'
import { Wall } from '@components/Wall'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DeletePopover } from '@features/report/components/DeletePopover'
import { AppToaster } from '@components/AppToaster'

import * as schema from './schema.generated'
import * as types from '@app/types'

const jsDateFormatter: DateFormatProps = {
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str)
}

export function ListPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState<types.ReportSort | undefined>(
    types.ReportSort.IdAsc
  )
  const [filter, setFilter] = useState<types.ReportFilter>({})
  const [generatePdf, generatePdfState] =
    schema.useReportListPageReportGeneratePdfMutation()
  const manyQuery = schema.useReportListPageReportPaginateQuery({
    variables: {
      sort,
      filter,
      page,
      perPage
    },
    notifyOnNetworkStatusChange: true
  })
  const items = manyQuery?.data?.reportPaginate?.items || []
  const pageInfo = manyQuery?.data?.reportPaginate?.pageInfo || {
    page,
    perPage,
    total: 0
  }

  const handleGeneratePdf = async () => {
    const response = await generatePdf({
      variables: {
        filter,
        sort
      }
    })

    if (response.data?.reportGeneratePdf.record) {
      window.open(response.data.reportGeneratePdf.record.url)
    }

    if (response.data?.reportGeneratePdf.error) {
      AppToaster.show({
        message: response.data.reportGeneratePdf.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <MainTemplate
      title="Отчеты"
      headline={[
        {
          title: 'Отчеты'
        }
      ]}
      extra={
        <div className="flex">
          <Button
            onClick={handleGeneratePdf}
            disabled={generatePdfState.loading}
            loading={generatePdfState.loading}
          >
            Печатать
          </Button>
          <div className="mx-2" />
          <Link href="/report/create" passHref>
            <AnchorButton icon="add" intent="primary">
              Добавить отчет
            </AnchorButton>
          </Link>
        </div>
      }
    >
      <Wall>
        <Table<schema.ReportListPageItemFragment>
          sticky
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
          summary={() => (
            <Table.Summary fixed="top">
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <InputGroup
                    value={filter.id?.eq ? String(filter.id?.eq) : undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        id: {
                          eq: Number(e.target.value)
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <InputGroup
                    value={filter.clientName?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        clientName: {
                          contains: e.target.value
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <InputGroup
                    value={filter.vehicleModel?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        vehicleModel: {
                          contains: e.target.value
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <InputGroup
                    value={filter.vehicleStateNumber?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        vehicleStateNumber: {
                          contains: e.target.value
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <InputGroup
                    value={filter.totalMileage?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        totalMileage: {
                          contains: e.target.value
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <InputGroup
                    value={filter.lubricantMileage?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        lubricantMileage: {
                          contains: e.target.value
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <InputGroup
                    value={filter.samplingNodes?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        samplingNodes: {
                          contains: e.target.value
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <InputGroup
                    value={filter.lubricant?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        lubricant: {
                          contains: e.target.value
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                  <DateInput
                    {...jsDateFormatter}
                    value={filter.sampledAt?.eq || undefined}
                    onChange={(value) =>
                      setFilter((prev) => ({
                        ...prev,
                        sampledAt: {
                          eq: value
                        }
                      }))
                    }
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={9} colSpan={4} />
              </Table.Summary.Row>
            </Table.Summary>
          )}
          footer={() => (
            <div className='flex justify-end'>
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
                text="Номер"
                sortAsc={types.ReportSort.IdAsc}
                sortDesc={types.ReportSort.IdDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="id"
          />
          <Table.Column
            title={<Table.Title text="Владелец техники" />}
            dataIndex={['client', 'name']}
          />
          <Table.Column
            title={<Table.Title text="Модель" />}
            dataIndex={['vehicle', 'model']}
          />
          <Table.Column
            title={<Table.Title text="Гос. номер" />}
            dataIndex={['vehicle', 'stateNumber']}
          />
          <Table.Column
            title={
              <Table.Title
                text="Общий пробег"
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
                sortAsc={types.ReportSort.LubricantAsc}
                sortDesc={types.ReportSort.LubricantDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="lubricant"
          />
          <Table.Column
            title={
              <Table.Title
                text="Дата пробы"
                sortAsc={types.ReportSort.SampledAtAsc}
                sortDesc={types.ReportSort.SampledAtDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="sampledAt"
            render={(value) => new Date(value).toLocaleDateString()}
          />
          <Table.Column title="Примечание" dataIndex="note" />
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
