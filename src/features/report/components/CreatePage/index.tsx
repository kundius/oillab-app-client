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

const jsDateFormatter: DateFormatProps = {
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str),
  placeholder: 'D/M/YYYY'
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
        message: '?????????? ????????????????',
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
        title="???????????????????? / ????????????"
        headline={[
          {
            href: '/report',
            title: '????????????'
          },
          {
            title: '????????????????????'
          }
        ]}
        extra={
          <Button
            intent={Intent.PRIMARY}
            type="submit"
            loading={mutationState.loading}
            disabled={mutationState.loading}
          >
            ??????????????????
          </Button>
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
                }) => <SelectVehicle ownerId={watchClient.value} {...field} />}
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
          {(isManager || isAdministrator) && (
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
