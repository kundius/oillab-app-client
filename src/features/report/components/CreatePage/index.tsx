import React, { useCallback } from 'react'
import {
  Button,
  InputGroup,
  Intent,
  Position,
  Tooltip
} from '@blueprintjs/core'
import { format, parse } from 'date-fns'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  DateInput,
  DateFormatProps,
  TimePrecision
} from '@blueprintjs/datetime'

import { UploadFile, UploadFileValue } from '@components/UploadFile'
import {
  Select as SelectUser,
  SelectValue as SelectUserValue
} from '@features/users/components/Select'
import {
  SelectVehicle,
  SelectVehicleValue
} from '@features/vehicle/components/SelectVehicle'
import {
  Select as SelectLubricant,
  SelectValue as SelectLubricantValue
} from '@features/lubricant/components/Select'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DetailsForForm } from '@features/vehicle/components/DetailsForForm'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { useHasRole } from '@app/features/app/hooks/useHasRole'

import * as schema from './schema.generated'
import * as types from '@app/types'
import { FormField } from '@app/components/FormField'

export interface FormFields extends types.ReportCreateInput {
  clientEntity?: SelectUserValue | null
  vehicleEntity?: SelectVehicleValue | null
  lubricantEntity?: SelectLubricantValue | null
  laboratoryResultFile?: UploadFileValue | null
  expressLaboratoryResultFile?: UploadFileValue | null
}

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useReportCreatePageMutation()
  const query = schema.useReportCreatePageQuery()
  const isAdministrator = useHasRole(types.UserRole.Administrator)
  const isManager = useHasRole(types.UserRole.Manager)

  const {
    handleSubmit,
    control,
    watch,
    formState: { isDirty }
  } = useForm<FormFields>()
  
  const dateFnsFormat = 'dd.MM.yyyy'
  const formatDate = useCallback((date: Date) => format(date, dateFnsFormat), [])
  const parseDate = useCallback((date: string) => parse(date, dateFnsFormat, new Date()), [])


  const watchClient = watch('clientEntity')
  const watchVehicle = watch('vehicleEntity')

  const onSubmit = async ({
    clientEntity,
    vehicleEntity,
    lubricantEntity,
    laboratoryResultFile,
    expressLaboratoryResultFile,
    ...input
  }: FormFields) => {
    const response = await mutation({
      variables: {
        input: {
          ...input,
          client: clientEntity === null ? clientEntity : clientEntity?.value,
          vehicle:
            vehicleEntity === null ? vehicleEntity : vehicleEntity?.value,
          lubricantEntityId:
            lubricantEntity === null ? lubricantEntity : lubricantEntity?.value,
          laboratoryResult:
            laboratoryResultFile === null
              ? laboratoryResultFile
              : laboratoryResultFile?.id,
          expressLaboratoryResult:
            expressLaboratoryResultFile === null
              ? expressLaboratoryResultFile
              : expressLaboratoryResultFile?.id
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
          {isAdministrator && (
            <FormField label="Владелец техники:">
              <Controller
                name="clientEntity"
                control={control}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => <SelectUser {...field} />}
              />
            </FormField>
          )}
          {watchClient && (
            <FormField label="Техника:">
              <Controller
                name="vehicleEntity"
                control={control}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => <SelectVehicle ownerId={watchClient.value} {...field} />}
              />
            </FormField>
          )}
          {watchVehicle && <DetailsForForm id={watchVehicle.value} />}
          <FormField label="Номер бланка:">
            <Controller
              name="formNumber"
              control={control}
              rules={{
                required: 'Номер бланка не может быть пустым',
                pattern: {
                  value: /^[^0\s]\S*$/,
                  message: "Номер бланка не может начинаться с 0 или содержать пробелы."
                }
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
          </FormField>
          <FormField label="Общий пробег агрегата:">
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
          </FormField>
          <FormField label="Пробег/наработка на смазочном материале:">
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
          </FormField>
          <FormField label="Узел пробоотбора:">
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
          </FormField>
          <FormField label="Смазочный материал:">
            <Controller
              name="lubricantEntity"
              control={control}
              render={({
                field: { ref, ...field },
                fieldState: { error }
              }) => <SelectLubricant {...field} />}
            />
          </FormField>
          <FormField label="Дата забора пробы/образца:">
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
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder={dateFnsFormat}
                  disabled={mutationState.loading}
                  className="w-full"
                  value={value ? new Date(value) : undefined}
                  onChange={onChange}
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
          </FormField>
          <FormField label="Долив СМ:">
            <Controller
              name="vehicleToppingUpLubricant"
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
          </FormField>
          <FormField label="Состояние СМ:">
            <Controller
              name="lubricantState"
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
          </FormField>
          <FormField label="Объём образца:">
            <Controller
              name="selectionVolume"
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
          </FormField>
          <FormField label="Примечание:">
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
          </FormField>
          {(isManager || isAdministrator) && (
            <FormField label="Цвет:">
              <Controller
                name="color"
                control={control}
                render={({
                  field: { value, ...field },
                  fieldState: { error }
                }) => (
                  <div className="bp4-html-select">
                    <select
                      {...field}
                      disabled={mutationState.loading}
                      defaultValue={value || undefined}
                    >
                      <option>Выбрать цвет...</option>
                      <option value="Red">Красный</option>
                      <option value="Yellow">Желтый</option>
                      <option value="LightGreen">Светло зеленый</option>
                    </select>
                    <span className="bp4-icon bp4-icon-double-caret-vertical"></span>
                  </div>
                )}
              />
            </FormField>
          )}
          {isAdministrator && (
            <FormField label="Экспресс результат лаборатории:">
              <Controller
                name="expressLaboratoryResultFile"
                control={control}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => <UploadFile {...field} />}
              />
            </FormField>
          )}
          {isAdministrator && (
            <FormField label="Результат лаборатории:">
              <Controller
                name="laboratoryResultFile"
                control={control}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => <UploadFile {...field} />}
              />
            </FormField>
          )}
        </div>
      </MainTemplate>
    </form>
  )
}
