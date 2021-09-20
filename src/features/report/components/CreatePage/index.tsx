import React from 'react'
import {
  Button,
  InputGroup,
  Intent,
  Position,
  Tooltip
} from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  DateInput,
  DateFormatProps,
  TimePrecision
} from '@blueprintjs/datetime'

import {
  SelectUser,
  SelectUserValue
} from '@features/users/components/SelectUser'
import {
  SelectVehicle,
  SelectVehicleValue
} from '@features/vehicle/components/SelectVehicle'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'

import * as schema from './schema.generated'

export interface FormFields {
  stateNumber: string
  totalMileage: string
  lubricantMileage: string
  samplingNodes: string
  note: string
  lubricant: string
  sampledAt: string
  client: SelectUserValue
  vehicle: SelectVehicleValue
}

const jsDateFormatter: DateFormatProps = {
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str),
  placeholder: 'M/D/YYYY'
}

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useReportCreatePageMutation()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty }
  } = useForm<FormFields>()

  const onSubmit = async ({ client, vehicle, ...input }: FormFields) => {
    const response = await mutation({
      variables: {
        input: {
          ...input,
          client: client.value,
          vehicle: vehicle.value
        }
      }
    })

    if (response.data?.reportCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'reportPaginate'
      })
      AppToaster.show({
        message: 'Отчет добавлен',
        intent: Intent.SUCCESS
      })
      router.push(`/report/${response.data.reportCreate.record?.id}`)
    }

    if (response.data?.reportCreate.error) {
      AppToaster.show({
        message: response.data.reportCreate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title="Добавление / Отчеты"
        headline={[
          {
            href: '/report',
            title: 'Отчеты'
          },
          {
            title: 'Добавление'
          }
        ]}
        extra={
          <Button
            intent={Intent.PRIMARY}
            type="submit"
            loading={mutationState.loading}
            disabled={mutationState.loading}
          >
            Сохранить
          </Button>
        }
      >
        <div
          className="space-y-8 max-w-full ml-auto mr-auto"
          style={{ width: 800 }}
        >
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Общий пробег агрегата:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="totalMileage"
                control={control}
                rules={{
                  required: 'Значение обязательно'
                }}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    large
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={
                      !!error ? (
                        <ErrorIcon
                          message={error.message}
                          loading={mutationState.loading}
                        />
                      ) : undefined
                    }
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Пробег/наработка на смазочном материале:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="lubricantMileage"
                control={control}
                rules={{
                  required: 'Значение обязательно'
                }}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    large
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={
                      !!error ? (
                        <ErrorIcon
                          message={error.message}
                          loading={mutationState.loading}
                        />
                      ) : undefined
                    }
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Гос номер:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="stateNumber"
                control={control}
                rules={{
                  required: 'Значение обязательно'
                }}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    large
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={
                      !!error ? (
                        <ErrorIcon
                          message={error.message}
                          loading={mutationState.loading}
                        />
                      ) : undefined
                    }
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Узел пробоотбора:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="samplingNodes"
                control={control}
                rules={{
                  required: 'Значение обязательно'
                }}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    large
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={
                      !!error ? (
                        <ErrorIcon
                          message={error.message}
                          loading={mutationState.loading}
                        />
                      ) : undefined
                    }
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Смазочный материал:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="lubricant"
                control={control}
                rules={{
                  required: 'Значение обязательно'
                }}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    large
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={
                      !!error ? (
                        <ErrorIcon
                          message={error.message}
                          loading={mutationState.loading}
                        />
                      ) : undefined
                    }
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Дата забора пробы/образца:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="sampledAt"
                control={control}
                rules={{
                  required: 'Значение обязательно'
                }}
                render={({
                  field: { ref, value, onChange, ...field },
                  fieldState: { error }
                }) => (
                  <DateInput
                    {...jsDateFormatter}
                    disabled={mutationState.loading}
                    className="w-full bp4-large"
                    value={value ? new Date(value) : undefined}
                    onChange={onChange}
                    popoverProps={{ position: Position.BOTTOM }}
                    rightElement={
                      !!error ? (
                        <ErrorIcon
                          message={error.message}
                          loading={mutationState.loading}
                        />
                      ) : undefined
                    }
                  />
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Примечание:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="note"
                control={control}
                rules={{
                  required: 'Значение обязательно'
                }}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    large
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={
                      !!error ? (
                        <ErrorIcon
                          message={error.message}
                          loading={mutationState.loading}
                        />
                      ) : undefined
                    }
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Клиент:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="client"
                control={control}
                rules={{
                  required: true
                }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <div className="inline-flex space-x-2">
                    <SelectUser {...field} />
                    {!!error && (
                      <ErrorIcon
                        message="Укажите клиента"
                        loading={mutationState.loading}
                      />
                    )}
                  </div>
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end text-base leading-none text-right">
              Техника:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="vehicle"
                control={control}
                rules={{
                  required: true
                }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <div className="inline-flex space-x-2">
                    <SelectVehicle {...field} />
                    {!!error && (
                      <ErrorIcon
                        message="Укажите технику"
                        loading={mutationState.loading}
                      />
                    )}
                  </div>
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
        </div>
      </MainTemplate>
    </form>
  )
}
