import getRuntimeConfig from '@app/utils/getRuntimeConfig'
import {
  AnchorButton,
  Button,
  ButtonGroup,
  Divider,
  InputGroup,
  Intent,
  NonIdealState,
  Spinner,
  Tooltip
} from '@blueprintjs/core'
import { DateInput3, TimePrecision } from '@blueprintjs/datetime2'
import { format, parse } from 'date-fns'
import ruRU from 'date-fns/locale/ru'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { useToken } from '@app/features/app/hooks/useToken'
import { showToast } from '@components/AppToaster'
import { Pagination } from '@components/Pagination'
import { Table } from '@components/Table'
import { Wall } from '@components/Wall'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { useHasRole } from '@features/app/hooks/useHasRole'
import { FilterPopover as LubricantFilterPopover } from '@features/lubricant/components/FilterPopover'
import { DeletePopover } from '@features/report/components/DeletePopover'

import * as types from '@app/types'
import * as schema from './schema.generated'

const { publicRuntimeConfig } = getRuntimeConfig()

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
    <AnchorButton
      href={value.url}
      target="_blank"
      icon="cloud-download"
      small
      minimal
    />
  )
}

const renderTooltip = (value: string) => {
  if (!value) return
  return (
    <Tooltip content={value}>
      <AnchorButton icon="comment" small minimal />
    </Tooltip>
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
      await showToast({
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
        <div className="flex gap-2">
          <Link href="/mailing">
            <Button>Отправка писем</Button>
          </Link>
          <Button
            onClick={handleGeneratePdf}
            disabled={generatePdfState.loading}
            loading={generatePdfState.loading}
          >
            Печатать
          </Button>
          {isAdministrator && (
            <Link href="/report/create" legacyBehavior passHref>
              <AnchorButton icon="add" intent="primary">
                Добавить отчет
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
                  <LubricantFilterPopover
                    value={filter.lubricantEntity}
                    onChange={(value) =>
                      setFilter((prev) => ({
                        ...prev,
                        lubricantEntity: value
                      }))
                    }
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                  <DateInput3
                    timePickerProps={{ className: 'hidden' }}
                    timePrecision={TimePrecision.MINUTE}
                    showTimezoneSelect={false}
                    locale={ruRU}
                    dateFnsFormat={'dd.MM.yyyy'}
                    value={filter.sampledAt?.eq || null}
                    onChange={(date) => {
                      setFilter((prev) => ({
                        ...prev,
                        sampledAt: date
                          ? {
                              eq: date
                            }
                          : undefined
                      }))
                    }}
                  />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={9} />
                {(isManager || isAdministrator) && (
                  <Table.Summary.Cell index={10}>
                    <div className="bp5-html-select">
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
                        <option value="Red">Красный</option>
                        <option value="Yellow">Желтый</option>
                        <option value="LightGreen">Светло зеленый</option>
                      </select>
                      <span className="bp5-icon bp5-icon-double-caret-vertical" />
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
                text="Номер"
                sortAsc={types.ReportSort.NumberAsc}
                sortDesc={types.ReportSort.NumberDesc}
                sortValue={sort}
                onSortChange={setSort}
              />
            }
            dataIndex="number"
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
            title="Смазочный материал"
            dataIndex="lubricantEntity"
            render={(lubricantEntity) =>
              `${lubricantEntity?.brandEntity?.name} / ${lubricantEntity?.model} / ${lubricantEntity?.viscosity}`
            }
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
            render={renderDate}
          />
          <Table.Column
            title="Примечание"
            dataIndex="note"
            align="center"
            width={84}
            render={renderTooltip}
          />
          {(isManager || isAdministrator) && (
            <Table.Column
              title="Цвет"
              dataIndex="color"
              align="center"
              width={84}
              render={renderColor}
            />
          )}
          <Table.Column
            title="Результат лаборатории"
            dataIndex="laboratoryResult"
            align="center"
            width={84}
            render={renderFile}
          />
          <Table.Column
            title="Экспресс результат лаборатории"
            dataIndex="expressLaboratoryResult"
            align="center"
            width={84}
            render={renderFile}
          />
          {isAdministrator && (
            <>
              <Table.Column
                title="Бланк-заявка"
                key="applicationForm"
                align="center"
                width={84}
                render={(record: schema.ReportListPageItemFragment) => (
                  <ButtonGroup minimal>
                    <AnchorButton
                      href={`${publicRuntimeConfig.API_URL}/report/${record.id}/applicationform/${record.formNumber || ''}. Бланк отбора пробы_${record.vehicle?.stateNumber || ''}_${record.lubricantEntity?.brandEntity?.name || ''} ${record.lubricantEntity?.model || ''}.pdf?token=${token}`}
                      target="_blank"
                      icon="cloud-download"
                      small
                    />
                  </ButtonGroup>
                )}
              />
              <Table.Column
                title="Регистрационная наклейка"
                key="registrationSticker"
                align="center"
                width={84}
                render={(record: schema.ReportListPageItemFragment) => (
                  <AnchorButton
                    href={`${publicRuntimeConfig.API_URL}/report/${record.id}/registrationsticker?token=${token}`}
                    target="_blank"
                    icon="cloud-download"
                    small
                    minimal
                  />
                )}
              />
              <Table.Column
                title="Действия"
                align="center"
                key="action"
                width={84}
                render={(record: schema.ReportListPageItemFragment) => (
                  <ButtonGroup minimal>
                    <Link href={`/report/${record.id}`} legacyBehavior passHref>
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
