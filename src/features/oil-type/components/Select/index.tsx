import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Classes, Dialog, Spinner } from '@blueprintjs/core'

import { Pagination } from '@components/Pagination'

import * as schema from './schema.generated'

export interface SelectValue {
  label: string
  value: number
}

export interface SelectProps {
  value?: SelectValue | null
  onChange?: (v?: SelectValue | null) => void
}

export function Select ({ value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const query = schema.useOilTypeSelectQuery({
    variables: {
      page,
      perPage,
      filter: {
        name: {
          contains: search || undefined
        }
      }
    },
    notifyOnNetworkStatusChange: true
  })

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleSelect = (record: schema.OilTypeSelectFragment) => {
    handleClose()
    onChange?.({
      value: record.id,
      label: record.name
    })
  }
  const onPaginate = (page: number, pageSize: number) => setPage(page)
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <>
      <div className="inline-flex space-x-2">
        <ButtonGroup>
          <Button
            icon="new-layer"
            onClick={handleOpen}
          >
            {value ? value.label : 'Выбрать вид масла'}
          </Button>
          {value && (
            <Button
              icon="cross"
              onClick={() => onChange?.(null)}
            />
          )}
        </ButtonGroup>
      </div>
      <Dialog
        isOpen={isOpen}
        icon="new-layer"
        onClose={handleClose}
        title="Выбрать вид масла"
        style={{ paddingBottom: 0 }}
      >
        <div className={Classes.DIALOG_BODY}>
          {query.loading && (
            <div className="mb-4">
              <Spinner />
            </div>
          )}
          <div className="space-y-2 mb-4">
            {query.data?.oiltypePaginate.items.map((record) => (
              <div
                className="flex justify-between items-center font-medium bg-white border rounded p-2"
                key={record.id}
              >
                {record.name}
                <Button
                  small
                  onClick={() => handleSelect(record)}
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
                placeholder="Поиск по названию"
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
              total={query.data?.oiltypePaginate.pageInfo.total}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
