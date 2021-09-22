import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Classes, Dialog, Spinner } from '@blueprintjs/core'

import { Pagination } from '@components/Pagination'

import * as schema from './schema.generated'

export interface SelectUserValue {
  label: string
  value: string
}

export interface SelectUserProps {
  value?: SelectUserValue | null
  onChange?: (v?: SelectUserValue | null) => void
}

export function SelectUser ({ value, onChange }: SelectUserProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const query = schema.useUsersSelectUserQuery({
    variables: {
      page,
      perPage,
      search
    },
    notifyOnNetworkStatusChange: true
  })

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleSelect = (record: schema.UsersSelectUserFragment) => {
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
          icon="new-person"
          onClick={handleOpen}
        >
          {value ? value.label : 'Выбрать пользователя'}
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
        icon="new-person"
        onClose={handleClose}
        title="Выбрать пользователя"
        style={{ paddingBottom: 0 }}
      >
        <div className={Classes.DIALOG_BODY}>
          {query.loading && (
            <div className="mb-4">
              <Spinner />
            </div>
          )}
          <div className="space-y-2 mb-4">
            {query.data?.userPaginate.items.map((record) => (
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
            <div className="bp4-input-group">
              <span className="bp4-icon bp4-icon-search" />
              <input
                className="bp4-input"
                placeholder="Поиск по имени"
                dir="auto"
                onChange={onSearch}
                value={search}
              />
            </div>
            <Pagination
              onChange={onPaginate}
              current={page}
              pageSize={perPage}
              total={query.data?.userPaginate.pageInfo.total}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
