import React from 'react'
import {
  Button,
  InputGroup,
  Intent,
  Position,
  AnchorButton,
  Menu,
  MenuDivider,
  MenuItem
} from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { DateInput, DateFormatProps } from '@blueprintjs/datetime'
import { Popover2 } from '@blueprintjs/popover2'
import Link from 'next/link'

import { FormField } from '@components/FormField'
import getRuntimeConfig from '@app/utils/getRuntimeConfig'
import { UploadFile, UploadFileValue } from '@components/UploadFile'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { DetailsForForm } from '@features/vehicle/components/DetailsForForm'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import {
  Select as SelectUser,
  SelectValue as SelectUserValue
} from '@features/users/components/Select'
import {
  Select as SelectLubricant,
  SelectValue as SelectLubricantValue
} from '@features/lubricant/components/Select'
import {
  SelectVehicle,
  SelectVehicleValue
} from '@features/vehicle/components/SelectVehicle'
import { useHasRole } from '@app/features/app/hooks/useHasRole'
import { useToken } from '@app/features/app/hooks/useToken'

import * as schema from './schema.generated'
import * as types from '@app/types'

const { publicRuntimeConfig } = getRuntimeConfig()

export interface FormFields extends types.ReportUpdateInput {
  clientEntity?: SelectUserValue | null
  vehicleEntity?: SelectVehicleValue | null
  lubricantEntity?: SelectLubricantValue | null
  laboratoryResultFile?: UploadFileValue | null
  expressLaboratoryResultFile?: UploadFileValue | null
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
  const isAdministrator = useHasRole(types.UserRole.Administrator)
  const isManager = useHasRole(types.UserRole.Manager)

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
      color: initialReport.color || undefined,
      lubricant: initialReport.lubricant || undefined,
      sampledAt: initialReport.sampledAt || undefined,
      clientEntity: initialReport.client
        ? {
            label: initialReport.client.name,
            value: initialReport.client.id
          }
        : undefined,
      vehicleEntity: initialReport.vehicle
        ? {
            label: initialReport.vehicle.model,
            value: initialReport.vehicle.id
          }
        : undefined,
      lubricantEntity: initialReport.lubricantEntity
        ? {
            label: initialReport.lubricantEntity.model,
            value: initialReport.lubricantEntity.id
          }
        : undefined,
      expressLaboratoryResultFile: initialReport.expressLaboratoryResult,
      laboratoryResultFile: initialReport.laboratoryResult
    }
  })
  const token = useToken()

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
        id: initialReport.id,
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

    if (response.data?.reportUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'reportPaginate'
      })
      AppToaster.show({
        message: '?????????? ??????????????',
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

  const pageTitle = `${
    query.data?.report?.number || initialReport.number || '?????????? ???? ????????????????'
  }`

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title={`${pageTitle} / ????????????`}
        headline={[
          {
            href: '/report',
            title: '????????????'
          },
          {
            title: pageTitle
          }
        ]}
        extra={
          <div className="flex gap-2">
            <Popover2
              content={
                <Menu>
                  <MenuDivider title="??????????????" />
                  <a
                    href={`${publicRuntimeConfig.API_URL}/report/${initialReport.id}/applicationform?token=${token}`}
                    target="_blank"
                  >
                    <MenuItem icon="cloud-download" text="??????????-????????????" />
                  </a>
                  <a
                    href={`${publicRuntimeConfig.API_URL}/report/${initialReport.id}/registrationsticker?token=${token}`}
                    target="_blank"
                  >
                    <MenuItem
                      icon="cloud-download"
                      text="?????????????????????????????? ????????????????"
                    />
                  </a>
                </Menu>
              }
            >
              <Button icon="more" minimal />
            </Popover2>
            <Button
              intent={Intent.PRIMARY}
              type="submit"
              loading={mutationState.loading}
              disabled={mutationState.loading}
            >
              ??????????????????
            </Button>
          </div>
        }
      >
        <div
          className="space-y-8 max-w-full ml-auto mr-auto"
          style={{ width: 800 }}
        >
          {isAdministrator && (
            <FormField label="???????????????? ??????????????:">
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
            <FormField label="??????????????:">
              <Controller
                name="vehicleEntity"
                control={control}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <SelectVehicle ownerId={watchClient.value} {...field} />
                )}
              />
            </FormField>
          )}
          {watchVehicle && <DetailsForForm id={watchVehicle.value} />}
          <FormField label="?????????? ???????????? ????????????????:">
            <Controller
              name="totalMileage"
              control={control}
              rules={{
                required: '???????????????? ??????????????????????'
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
          <FormField label="????????????/?????????????????? ???? ?????????????????? ??????????????????:">
            <Controller
              name="lubricantMileage"
              control={control}
              rules={{
                required: '???????????????? ??????????????????????'
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
          <FormField label="???????? ??????????????????????:">
            <Controller
              name="samplingNodes"
              control={control}
              rules={{
                required: '???????????????? ??????????????????????'
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
          <FormField label="?????????????????? ????????????????:">
            <Controller
              name="lubricant"
              control={control}
              rules={{
                required: '???????????????? ??????????????????????'
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
          <FormField label="?????????????????? ????????????????:">
            <Controller
              name="lubricantEntity"
              control={control}
              render={({
                field: { ref, ...field },
                fieldState: { error }
              }) => <SelectLubricant {...field} />}
            />
          </FormField>
          <FormField label="???????? ???????????? ??????????/??????????????:">
            <Controller
              name="sampledAt"
              control={control}
              rules={{
                required: '???????????????? ??????????????????????'
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
          </FormField>
          <FormField label="????????????????????:">
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
          {(isAdministrator || isManager) && (
            <FormField label="????????:">
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
                      <option>?????????????? ????????...</option>
                      <option value="Red">??????????????</option>
                      <option value="Yellow">????????????</option>
                      <option value="LightGreen">???????????? ??????????????</option>
                    </select>
                    <span className="bp4-icon bp4-icon-double-caret-vertical"></span>
                  </div>
                )}
              />
            </FormField>
          )}
          {isAdministrator && (
            <FormField label="???????????????? ?????????????????? ??????????????????????:">
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
            <FormField label="?????????????????? ??????????????????????:">
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
