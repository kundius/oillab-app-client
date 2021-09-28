import React from 'react'
import { Button, InputGroup, Intent, Position } from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { DateInput, DateFormatProps } from '@blueprintjs/datetime'

import { UploadFile, UploadFileValue } from '@components/UploadFile'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DetailsForForm } from '@features/vehicle/components/DetailsForForm'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import {
  SelectUser,
  SelectUserValue
} from '@features/users/components/SelectUser'
import {
  SelectVehicle,
  SelectVehicleValue
} from '@features/vehicle/components/SelectVehicle'

import * as schema from './schema.generated'

export interface FormFields {
  stateNumber: string
  totalMileage: string
  lubricantMileage: string
  samplingNodes: string
  note?: string
  lubricant: string
  sampledAt: string
  client?: SelectUserValue | null
  vehicle?: SelectVehicleValue | null
  laboratoryResult?: UploadFileValue | null
  expressLaboratoryResult?: UploadFileValue | null
}

export interface UpdatePageProps {
  initialReport: schema.ReportUpdatePageFragment
}

const jsDateFormatter: DateFormatProps = {
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str),
  placeholder: 'M/D/YYYY'
}

export function UpdatePage({ initialReport }: UpdatePageProps) {
  const apollo = useApolloClient()
  const query = schema.useReportUpdatePageQuery({
    variables: {
      id: initialReport.id
    }
  })
  const [mutation, mutationState] = schema.useReportUpdatePageMutation()

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { isDirty }
  } = useForm<FormFields>({
    defaultValues: {
      totalMileage: initialReport.totalMileage || undefined,
      lubricantMileage: initialReport.lubricantMileage || undefined,
      samplingNodes: initialReport.samplingNodes || undefined,
      note: initialReport.note || undefined,
      lubricant: initialReport.lubricant || undefined,
      sampledAt: initialReport.sampledAt || undefined,
      client: initialReport.client
        ? {
            label: initialReport.client.name,
            value: initialReport.client.id
          }
        : undefined,
      vehicle: initialReport.vehicle
        ? {
            label: initialReport.vehicle.model,
            value: initialReport.vehicle.id
          }
        : undefined,
      expressLaboratoryResult: initialReport.expressLaboratoryResult,
      laboratoryResult: initialReport.laboratoryResult
    }
  })

  const watchClient = watch('client')
  const watchVehicle = watch('vehicle')

  const onSubmit = async ({
    client,
    vehicle,
    laboratoryResult,
    expressLaboratoryResult,
    ...input
  }: FormFields) => {
    const response = await mutation({
      variables: {
        id: initialReport.id,
        input: {
          ...input,
          client: client === null ? client : client?.value,
          vehicle: vehicle === null ? vehicle : vehicle?.value,
          laboratoryResult:
            laboratoryResult === null ? laboratoryResult : laboratoryResult?.id,
          expressLaboratoryResult:
            expressLaboratoryResult === null
              ? expressLaboratoryResult
              : expressLaboratoryResult?.id
        }
      }
    })

    if (response.data?.reportUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'reportPaginate'
      })
      AppToaster.show({
        message: 'Отчет изменен',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.reportUpdate.error) {
      AppToaster.show({
        message: response.data.reportUpdate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const pageTitle = `${query.data?.report?.number || initialReport.number}`

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title={`${pageTitle} / Отчет`}
        headline={[
          {
            href: '/report',
            title: 'Отчет'
          },
          {
            title: pageTitle
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
          {query.data?.currentUser?.role === 'Administrator' && (
            <div className="flex gap-8 items-center">
              <div className="w-1/4 flex justify-end leading-none text-right">
                Владелец техники:
              </div>
              <div className="w-2/4 flex justify-start">
                <Controller
                  name="client"
                  control={control}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => <SelectUser {...field} />}
                />
              </div>
              <div className="w-1/4" />
            </div>
          )}
          {watchClient && (
            <div className="flex gap-8 items-center">
              <div className="w-1/4 flex justify-end leading-none text-right">
                Техника:
              </div>
              <div className="w-2/4 flex justify-start">
                <Controller
                  name="vehicle"
                  control={control}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => <SelectVehicle ownerId={watchClient.value} {...field} />}
                />
              </div>
              <div className="w-1/4" />
            </div>
          )}
          {watchVehicle && <DetailsForForm id={watchVehicle.value} />}
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end leading-none text-right">
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
            <div className="w-1/4 flex justify-end leading-none text-right">
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
            <div className="w-1/4 flex justify-end leading-none text-right">
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
            <div className="w-1/4 flex justify-end leading-none text-right">
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
            <div className="w-1/4 flex justify-end leading-none text-right">
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
                    className="w-full"
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
            <div className="w-1/4 flex justify-end leading-none text-right">
              Примечание:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="note"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
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
          {query.data?.currentUser?.role === 'Administrator' && (
            <div className="flex gap-8 items-center">
              <div className="w-1/4 flex justify-end leading-none text-right">
                Экспресс результат лаборатории:
              </div>
              <div className="w-2/4 flex justify-start">
                <Controller
                  name="expressLaboratoryResult"
                  control={control}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => <UploadFile {...field} />}
                />
              </div>
              <div className="w-1/4" />
            </div>
          )}
          {query.data?.currentUser?.role === 'Administrator' && (
            <div className="flex gap-8 items-center">
              <div className="w-1/4 flex justify-end leading-none text-right">
                Результат лаборатории:
              </div>
              <div className="w-2/4 flex justify-start">
                <Controller
                  name="laboratoryResult"
                  control={control}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => <UploadFile {...field} />}
                />
              </div>
              <div className="w-1/4" />
            </div>
          )}
        </div>
      </MainTemplate>
    </form>
  )
}
