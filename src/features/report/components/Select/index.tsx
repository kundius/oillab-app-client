import React, { useState, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  Classes,
  Dialog,
  Spinner
} from '@blueprintjs/core'

import { Pagination } from '@components/Pagination'

import * as schema from './schema.generated'

export interface SelectValue {
  label: string
  value: number
}

export interface SelectProps {
  title?: string
  value?: SelectValue | null
  onChange?: (v?: SelectValue | null) => void
}

export function Select({
  value,
  onChange,
  title = 'Выбрать отчет'
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const query = schema.useReportSelectQuery({
    variables: {
      page,
      perPage,
      search
    },
    notifyOnNetworkStatusChange: true
  })

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleSelect = (record: schema.ReportSelectFragment) => {
    handleClose()
    onChange?.({
      value: record.id,
      label: `${record.client?.name}/${record.vehicle?.model} (${record.formNumber})`
    })
  }
  const onPaginate = (page: number, pageSize: number) => setPage(page)
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <>
      <ButtonGroup>
        <Button icon="id-number" onClick={handleOpen}>
          {value ? value.label : title}
        </Button>
        {value && <Button icon="cross" onClick={() => onChange?.(null)} />}
      </ButtonGroup>
      <Dialog
        isOpen={isOpen}
        icon="id-number"
        onClose={handleClose}
        title={title}
        className="pb-0"
      >
        <div className={Classes.DIALOG_BODY}>
          {query.loading && (
            <div className="mb-4">
              <Spinner />
            </div>
          )}
          <div className="space-y-2 mb-4">
            {query.data?.reportPaginate.items.map((record) => (
              <div
                className="flex justify-between items-center font-medium bg-white border rounded gap-2 leading-none p-2"
                key={record.id}
              >
                {`${record.client?.name}/${record.vehicle?.model} (${record.formNumber})`}
                <Button
                  small
                  onClick={() => handleSelect(record)}
                  className="shrink-0"
                >
                  Выбрать
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="bp5-input-group">
              <span className="bp5-icon bp5-icon-search" />
              <input
                className="bp5-input"
                placeholder="Поиск по номеру бланка"
                dir="auto"
                onChange={onSearch}
                value={search}
              />
            </div>
            <Pagination
              simple
              onChange={onPaginate}
              current={page}
              pageSize={perPage}
              total={query.data?.reportPaginate.pageInfo.total}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
