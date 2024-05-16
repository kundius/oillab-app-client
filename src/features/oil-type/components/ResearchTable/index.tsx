import React, { useState } from 'react'
import {
  Button,
  InputGroup,
  Intent,
  ButtonGroup,
  AnchorButton,
  Divider
} from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'

import { AppToaster, showToast } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { Wall } from '@app/components/Wall'
import { Table } from '@app/components/Table'

import * as schema from './schema.generated'
import * as types from '@app/types'
import { DeletePopover } from '@app/components/DeletePopover'

export interface ResearchTableProps {
  oilTypeId: number
}

export function ResearchTable({ oilTypeId }: ResearchTableProps) {
  const apollo = useApolloClient()
  const [editing, setEditing] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  const listQuery = schema.useOilTypeResearchTableListQuery({
    variables: {
      oilTypeId
    },
    notifyOnNetworkStatusChange: true
  })
  const items = listQuery?.data?.oilTypeResearchList?.items || []

  const [mutationCreate, mutationCreateState] =
    schema.useOilTypeResearchTableCreateMutation()
  const [mutationUpdate, mutationUpdateState] =
    schema.useOilTypeResearchTableUpdateMutation()
  const [mutationDelete, mutationDeleteState] =
    schema.useOilTypeResearchTableDeleteMutation()

  const createForm = useForm<types.OilTypeResearchCreateInput>()
  const updateForm = useForm<types.OilTypeResearchCreateInput>()

  const onCreateSubmit = async (input: types.OilTypeResearchCreateInput) => {
    const response = await mutationCreate({
      variables: {
        oilTypeId,
        input
      }
    })

    if (response.data?.oilTypeResearchCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'oilTypeResearchList'
      })
      await showToast({
        message: 'Параметр добавлен',
        intent: Intent.SUCCESS
      })
      createForm.reset()
    }

    if (response.data?.oilTypeResearchCreate.error) {
      await showToast({
        message: response.data.oilTypeResearchCreate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const onUpdateSubmit = async (input: types.OilTypeResearchCreateInput) => {
    if (!editing) return

    const response = await mutationUpdate({
      variables: {
        id: editing,
        input
      }
    })

    if (response.data?.oilTypeResearchUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'oilTypeResearchList'
      })
      await showToast({
        message: 'Параметр изменен',
        intent: Intent.SUCCESS
      })
      updateForm.reset()
      setEditing(null)
    }

    if (response.data?.oilTypeResearchUpdate.error) {
      await showToast({
        message: response.data.oilTypeResearchUpdate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const startEditHandlerCreator = (
    record: schema.OilTypeResearchTableItemFragment
  ) => {
    return () => {
      setEditing(record.id)
      updateForm.setValue('name', record.name)
    }
  }

  const cancelEditHandler = () => {
    setEditing(null)
    updateForm.reset()
  }

  const deleteHandlerCreator = (
    record: schema.OilTypeResearchTableItemFragment
  ) => {
    return async () => {
      setDeleting(record.id)

      const response = await mutationDelete({
        variables: {
          id: record.id
        }
      })

      if (response.data?.oilTypeResearchDelete.success) {
        apollo.cache.evict({
          id: 'ROOT_QUERY',
          fieldName: 'oilTypeResearchList'
        })
        await showToast({
          message: 'Параметр удален',
          intent: Intent.SUCCESS
        })
        setDeleting(null)
      }

      if (response.data?.oilTypeResearchDelete.error) {
        await showToast({
          message: response.data.oilTypeResearchDelete.error.message,
          intent: Intent.DANGER
        })
      }
    }
  }

  const createHandler = createForm.handleSubmit(onCreateSubmit)

  const updateHandler = updateForm.handleSubmit(onUpdateSubmit)

  return (
    <Wall>
      <Table<schema.OilTypeResearchTableItemFragment>
        data={items}
        rowKey={(record) => record.id}
        summary={(currentData) => (
          <>
            <tr>
              <td></td>
              <td>
                <Controller
                  name="name"
                  control={createForm.control}
                  rules={{
                    required: 'Значение обязательно'
                  }}
                  render={({
                    field: { ref, value, ...field },
                    fieldState: { error }
                  }) => (
                    <InputGroup
                      className="w-full my-[-3px]"
                      disabled={mutationCreateState.loading}
                      placeholder="Наименование показателя"
                      rightElement={
                        !!error ? (
                          <ErrorIcon
                            message={error.message}
                            loading={mutationCreateState.loading}
                          />
                        ) : undefined
                      }
                      inputRef={ref}
                      value={value || ''}
                      {...field}
                    />
                  )}
                />
              </td>
              <td>
                <div className="flex justify-center my-[-3px]">
                  <Button
                    intent={Intent.PRIMARY}
                    type="button"
                    onClick={createHandler}
                    loading={mutationCreateState.loading}
                    disabled={mutationCreateState.loading}
                  >
                    Добавить строку
                  </Button>
                </div>
              </td>
            </tr>
          </>
        )}
      >
        <Table.Column
          width={60}
          title="№"
          render={(_, __, n) => {
            return n + 1
          }}
        />
        <Table.Column<schema.OilTypeResearchTableItemFragment>
          title="Наименование показателя"
          dataIndex="name"
          render={(value, record) => {
            if (record.id === editing) {
              return (
                <Controller
                  name="name"
                  control={updateForm.control}
                  rules={{
                    required: 'Значение обязательно'
                  }}
                  render={({
                    field: { ref, value, ...field },
                    fieldState: { error }
                  }) => (
                    <InputGroup
                      className="w-full my-[-3px]"
                      disabled={mutationCreateState.loading}
                      placeholder="Наименование показателя"
                      rightElement={
                        !!error ? (
                          <ErrorIcon
                            message={error.message}
                            loading={mutationCreateState.loading}
                          />
                        ) : undefined
                      }
                      inputRef={ref}
                      value={value || ''}
                      {...field}
                    />
                  )}
                />
              )
            }
            return <div dangerouslySetInnerHTML={{ __html: value }} />
          }}
        />
        <Table.Column<schema.OilTypeResearchTableItemFragment>
          width={180}
          title="Действия"
          align="center"
          key="action"
          render={(_, record) => {
            if (editing === record.id) {
              return (
                <ButtonGroup minimal>
                  <AnchorButton
                    icon="tick"
                    small
                    onClick={updateHandler}
                    loading={mutationUpdateState.loading}
                    disabled={mutationUpdateState.loading}
                  />
                  <Divider />
                  <Button
                    icon="undo"
                    small
                    intent={Intent.WARNING}
                    onClick={cancelEditHandler}
                    disabled={mutationUpdateState.loading}
                  />
                </ButtonGroup>
              )
            }
            return (
              <ButtonGroup minimal>
                <AnchorButton
                  icon="edit"
                  small
                  onClick={startEditHandlerCreator(record)}
                  loading={mutationCreateState.loading && editing === record.id}
                  disabled={
                    (mutationCreateState.loading ||
                      mutationDeleteState.loading) &&
                    (editing === record.id || deleting === record.id)
                  }
                />
                <Divider />
                <DeletePopover
                  onConfirm={deleteHandlerCreator(record)}
                  isLoading={deleting === record.id}
                >
                  <Button
                    icon="trash"
                    small
                    intent={Intent.DANGER}
                    loading={
                      mutationDeleteState.loading && deleting === record.id
                    }
                    disabled={
                      (mutationCreateState.loading ||
                        mutationDeleteState.loading) &&
                      (editing === record.id || deleting === record.id)
                    }
                  />
                </DeletePopover>
              </ButtonGroup>
            )
          }}
        />
      </Table>
    </Wall>
  )
}
