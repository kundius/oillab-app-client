import React, { useState } from 'react'
import { Button, InputGroup, Intent } from '@blueprintjs/core'

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'

import * as schema from './schema.generated'
import * as types from '@app/types'
import { Table } from '@app/components/Table'
import { Wall } from '@app/components/Wall'

export interface UpdatePageProps {
  initialResult: schema.ResultUpdatePageFragment
}

interface TableColumn {
  id: number
  name: string
  ntd: string
  units: string
}

export function UpdatePage({ initialResult }: UpdatePageProps) {
  const query = schema.useResultUpdatePageQuery({
    variables: {
      id: initialResult.id
    }
  })
  const [mutation, mutationState] = schema.useResultUpdatePageMutation()

  const result = query.data?.result || initialResult

  const pageTitle = result.formNumber

  const getColumns = () => {
    return result?.oilType?.indicators.reduce<TableColumn[]>(
      (accumulator, currentValue) => {
        if (!!currentValue) {
          accumulator.push({
            id: currentValue.id,
            name: currentValue.name,
            ntd: currentValue.ntd,
            units: currentValue.units
          })
        }
        return accumulator
      },
      []
    )
  }

  const getDefaultValues = () => {
    return result.indicators.map((item) => ({
      oilTypeIndicatorId: item.oilTypeIndicator.id,
      value: item.value || ''
    }))
  }

  const [values, setValues] = useState<types.ResultUpdateIndicatorValue[]>(
    getDefaultValues()
  )

  const getValue = (indiatorId: number) => {
    return (
      values.find((item) => item.oilTypeIndicatorId === indiatorId)?.value || ''
    )
  }

  const changeHandlerCreator = (indiatorId: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => {
        if (prev.find((item) => item.oilTypeIndicatorId === indiatorId)) {
          return prev.map((item) => ({
            oilTypeIndicatorId: item.oilTypeIndicatorId,
            value:
              indiatorId === item.oilTypeIndicatorId
                ? e.target.value
                : item.value
          }))
        } else {
          return [
            ...prev,
            {
              oilTypeIndicatorId: indiatorId,
              value: e.target.value
            }
          ]
        }
      })
    }
  }

  const submitHandler = async () => {
    const response = await mutation({
      variables: {
        id: initialResult.id,
        input: {
          values
        }
      }
    })

    if (response.data?.resultUpdate.success) {
      AppToaster.show({
        message: 'Результаты изменены',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.resultUpdate.error) {
      AppToaster.show({
        message: response.data.resultUpdate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <MainTemplate
      title={`${pageTitle} / Результаты`}
      headline={[
        {
          href: '/result',
          title: 'Результаты'
        },
        {
          title: pageTitle
        }
      ]}
      extra={
        <Button
          intent={Intent.PRIMARY}
          type="button"
          onClick={submitHandler}
          loading={mutationState.loading}
          disabled={mutationState.loading}
        >
          Сохранить
        </Button>
      }
    >
      <div className="space-y-16">
        <Wall>
          <Table<TableColumn>
            data={getColumns()}
            rowKey={(record) => record.id}
          >
            <Table.Column
              width={60}
              title="№"
              render={(_, __, n) => {
                return n + 1
              }}
            />
            <Table.Column title="Наименование показателя" dataIndex="name" />
            <Table.Column title="НТД" dataIndex="ntd" />
            <Table.Column title="Единицы измерения" dataIndex="units" />
            <Table.Column<TableColumn>
              title="Результат"
              dataIndex="id"
              render={(value: number, record) => {
                return (
                  <InputGroup
                    className="w-full my-[-3px]"
                    disabled={mutationState.loading}
                    value={getValue(value)}
                    onChange={changeHandlerCreator(value)}
                  />
                )
              }}
            />
          </Table>
        </Wall>
      </div>
    </MainTemplate>
  )
}
