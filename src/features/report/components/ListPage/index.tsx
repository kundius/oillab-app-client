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
  InputGroup
} from '@blueprintjs/core'
import { DateFormatProps, DateInput } from '@blueprintjs/datetime'
import getRuntimeConfig from '@app/utils/getRuntimeConfig'

import { Table } from '@components/Table'
import { Pagination } from '@components/Pagination'
import { Wall } from '@components/Wall'
import { useHasRole } from '@features/app/hooks/useHasRole'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DeletePopover } from '@features/report/components/DeletePopover'
import { AppToaster } from '@components/AppToaster'
import { useToken } from '@app/features/app/hooks/useToken'
import { ApplicationFormModal } from '@app/features/report/components/ApplicationFormModal'

import * as schema from './schema.generated'
import * as types from '@app/types'

const { publicRuntimeConfig } = getRuntimeConfig()

const jsDateFormatter: DateFormatProps = {
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str)
}

const renderColor = (value: types.ReportColor) => {
  if (!value) return null
  let color = 'bg-gray-300'
  if (value === types.ReportColor.Yellow) {
    color = 'bg-yellow-300'
  }
  if (value === types.ReportColor.Red) {
    color = 'bg-red-300'
  }
  if (value === types.ReportColor.LightGreen) {
    color = 'bg-green-300'
  }
  return <div className={`inline-block rounded w-12 h-6 ${color}`} />
}

const renderFile = (value: Pick<types.File, 'id' | 'url'>) => {
  if (!value) return
  return (
    <a href={value.url} target="_blank">
      <AnchorButton icon="cloud-download" small minimal />
    </a>
  )
}

const renderDate = (value: string) => new Date(value).toLocaleDateString()

export function ListPage() {
  const token = useToken()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState<types.ReportSort | undefined>(
    types.ReportSort.IdAsc
  )
  const isAdministrator = useHasRole(types.UserRole.Administrator)
  const isManager = useHasRole(types.UserRole.Manager)
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
      title="????????????"
      headline={[
        {
          title: '????????????'
        }
      ]}
      extra={
        <div className="flex gap-2">
          <Button
            onClick={handleGeneratePdf}
            disabled={generatePdfState.loading}
            loading={generatePdfState.loading}
          >
            ????????????????
          </Button>
          {isAdministrator && (
            <Link href="/report/create" passHref>
              <AnchorButton icon="add" intent="primary">
                ???????????????? ??????????
              </AnchorButton>
            </Link>
          )}
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
          rowClassName={(record) => {
            if (!(record.expressLaboratoryResult || record.laboratoryResult)) {
              return 'app-table-row-blue'
            }
            return ''
          }}
          emptyText={
            <NonIdealState
              title={
                manyQuery.loading ? '???????????? ??????????????????????' : '???????????? ???? ??????????????'
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
                    value={filter.client?.name?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        client: {
                          ...prev.client,
                          name: {
                            contains: e.target.value
                          }
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <InputGroup
                    value={filter.vehicle?.model?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        vehicle: {
                          ...prev.vehicle,
                          model: {
                            contains: e.target.value
                          }
                        }
                      }))
                    }
                    fill
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <InputGroup
                    value={filter.vehicle?.stateNumber?.contains || undefined}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        vehicle: {
                          ...prev.vehicle,
                          stateNumber: {
                            contains: e.target.value
                          }
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
                <Table.Summary.Cell index={9} />
                {(isManager || isAdministrator) && (
                  <Table.Summary.Cell index={10}>
                    <div className="bp4-html-select">
                      <select
                        value={filter.color?.contains || undefined}
                        onChange={(e) =>
                          setFilter((prev) => ({
                            ...prev,
                            color: e.target.value
                              ? {
                                  contains: e.target.value
                                }
                              : undefined
                          }))
                        }
                      >
                        <option value=""></option>
                        <option value="Red">??????????????</option>
                        <option value="Yellow">????????????</option>
                        <option value="LightGreen">???????????? ??????????????</option>
                      </select>
                      <span className="bp4-icon bp4-icon-double-caret-vertical" />
                    </div>
                  </Table.Summary.Cell>
                )}
                <Table.Summary.Cell index={11} />
                <Table.Summary.Cell index={12} />
                {isAdministrator && <Table.Summary.Cell index={13} />}
                {isAdministrator && <Table.Summary.Cell index={14} />}
                {isAdministrator && <Table.Summary.Cell index={15} />}
              </Table.Summary.Row>
            </Table.Summary>
          )}
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
                text="??????????"
                sortAsc={types.ReportSort.NumberAsc}
                sortDesc={types.ReportSort.NumberDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="number"
          />
          <Table.Column
            title={<Table.Title text="???????????????? ??????????????" />}
            dataIndex={['client', 'name']}
          />
          <Table.Column
            title={<Table.Title text="????????????" />}
            dataIndex={['vehicle', 'model']}
          />
          <Table.Column
            title={<Table.Title text="??????. ??????????" />}
            dataIndex={['vehicle', 'stateNumber']}
          />
          <Table.Column
            title={
              <Table.Title
                text="?????????? ????????????"
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
                text="???????????? ???? ?????????????????? ??????????????????"
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
                text="???????? ??????????????????????"
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
                text="?????????????????? ????????????????"
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
                text="???????? ??????????"
                sortAsc={types.ReportSort.SampledAtAsc}
                sortDesc={types.ReportSort.SampledAtDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="sampledAt"
            render={renderDate}
          />
          <Table.Column title="????????????????????" dataIndex="note" />
          {(isManager || isAdministrator) && (
            <Table.Column
              title="????????"
              dataIndex="color"
              align="center"
              width={84}
              render={renderColor}
            />
          )}
          <Table.Column
            title="?????????????????? ??????????????????????"
            dataIndex="laboratoryResult"
            align="center"
            width={84}
            render={renderFile}
          />
          <Table.Column
            title="???????????????? ?????????????????? ??????????????????????"
            dataIndex="expressLaboratoryResult"
            align="center"
            width={84}
            render={renderFile}
          />
          {isAdministrator && (
            <>
              <Table.Column
                title="??????????-????????????"
                key="applicationForm"
                align="center"
                width={84}
                render={(record: schema.ReportListPageItemFragment) => (
                  <ButtonGroup minimal>
                    <a
                      href={`${publicRuntimeConfig.API_URL}/report/${record.id}/applicationform?token=${token}`}
                      target="_blank"
                    >
                      <AnchorButton icon="cloud-download" small />
                    </a>
                    <Divider />
                    <ApplicationFormModal
                      id={record.id}
                      initialData={record?.applicationForm || undefined}
                    >
                      {({ isLoading, open, close }) => (
                        <AnchorButton
                          icon="edit"
                          disabled={isLoading}
                          small
                          onClick={open}
                        />
                      )}
                    </ApplicationFormModal>
                  </ButtonGroup>
                )}
              />
              <Table.Column
                title="?????????????????????????????? ????????????????"
                key="registrationSticker"
                align="center"
                width={84}
                render={(record: schema.ReportListPageItemFragment) => (
                  <a
                    href={`${publicRuntimeConfig.API_URL}/report/${record.id}/registrationsticker?token=${token}`}
                    target="_blank"
                  >
                    <AnchorButton icon="cloud-download" small minimal />
                  </a>
                )}
              />
              <Table.Column
                title="????????????????"
                align="center"
                key="action"
                width={84}
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
            </>
          )}
        </Table>
      </Wall>
    </MainTemplate>
  )
}
