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

  const query = schema.useBrand_Select_Query({
    variables: {
      page,
      perPage,
      search
    },
    notifyOnNetworkStatusChange: true
  })

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleSelect = (record: schema.Brand_Select_Fragment) => {
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
      <ButtonGroup>
        <Button
          icon="bookmark"
          onClick={handleOpen}
        >
          {value ? value.label : 'Выбрать бренд'}
        </Button>
        {value && (
          <Button
            icon="cross"
            onClick={() => onChange?.(null)}
          />
        )}
      </ButtonGroup>
      <Dialog
        isOpen={isOpen}
        icon="bookmark"
        onClose={handleClose}
        title="Выбрать бренд"
        style={{ paddingBottom: 0 }}
      >
        <div className={Classes.DIALOG_BODY}>
          {query.loading && (
            <div className="mb-4">
              <Spinner />
            </div>
          )}
          <div className="space-y-2 mb-4">
            {query.data?.brandPaginate.items.map((record) => (
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
              total={query.data?.brandPaginate.pageInfo.total}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
