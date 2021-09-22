import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Classes, Dialog, Spinner } from '@blueprintjs/core'

import { Pagination } from '@components/Pagination'

import * as schema from './schema.generated'

export interface SelectVehicleValue {
  label: string
  value: string
}

export interface SelectVehicleProps {
  ownerId?: string
  value?: SelectVehicleValue | null
  onChange?: (v?: SelectVehicleValue | null) => void
}

export function SelectVehicle ({ ownerId, value, onChange }: SelectVehicleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const query = schema.useVehicleSelectVehicleQuery({
    variables: {
      page,
      perPage,
      filter: {
        ownerId: {
          eq: ownerId || undefined
        },
        model: {
          contains: search || undefined
        }
      }
    },
    notifyOnNetworkStatusChange: true
  })

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleSelect = (record: schema.VehicleSelectVehicleFragment) => {
    handleClose()
    onChange?.({
      value: record.id,
      label: record.model
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
            {value ? value.label : 'Выбрать технику'}
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
        title="Выбрать технику"
        style={{ paddingBottom: 0 }}
      >
        <div className={Classes.DIALOG_BODY}>
          {query.loading && (
            <div className="mb-4">
              <Spinner />
            </div>
          )}
          <div className="space-y-2 mb-4">
            {query.data?.vehiclePaginate.items.map((record) => (
              <div
                className="flex justify-between items-center font-medium bg-white border rounded p-2"
                key={record.id}
              >
                {record.model}
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
              total={query.data?.vehiclePaginate.pageInfo.total}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
