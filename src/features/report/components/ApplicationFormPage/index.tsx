import React from 'react'
import {
  Button,
  InputGroup,
  Intent,
  AnchorButton,
  Menu,
  MenuDivider,
  MenuItem
} from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import getRuntimeConfig from '@app/utils/getRuntimeConfig'
import { Popover2 } from '@blueprintjs/popover2'
import Link from 'next/link'

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import { FormField } from '@components/FormField'
import { FormFieldSet } from '@components/FormFieldSet'
import {
  Select as SelectLubricant,
  SelectValue as SelectLubricantValue
} from '@features/lubricant/components/Select'
import {
  Select as SelectUser,
  SelectValue as SelectUserValue
} from '@features/users/components/Select'
import { Details as LubricantDetails } from '@features/lubricant/components/Details'
import { Details as UserDetails } from '@features/users/components/Details'

import * as schema from './schema.generated'
import * as types from '@app/types'
import { useToken } from '@app/features/app/hooks/useToken'

const { publicRuntimeConfig } = getRuntimeConfig()

export interface ApplicationFormPageProps {
  initialReport: schema.ReportApplicationFormPageFragment
}

type FormFields = types.ReportUpdateApplicationFormInput

export function ApplicationFormPage({
  initialReport
}: ApplicationFormPageProps) {
  const client = initialReport.client
  const apollo = useApolloClient()
  const query = schema.useReportApplicationFormPageQuery({
    variables: {
      id: initialReport.id
    }
  })
  const [mutation, mutationState] =
    schema.useReportApplicationFormPageMutation()

  const {
    handleSubmit,
    control,
    watch,
    formState: { isDirty }
  } = useForm<FormFields>({
    defaultValues: {}
  })
  const token = useToken()

  const onSubmit = async (input: FormFields) => {
    const response = await mutation({
      variables: {
        id: initialReport.id,
        input
      }
    })

    if (response.data?.reportUpdateApplicationForm.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'reportPaginate'
      })
      AppToaster.show({
        message: 'Сохранено',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.reportUpdateApplicationForm.error) {
      AppToaster.show({
        message: response.data.reportUpdateApplicationForm.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const pageTitle = `${
    query.data?.report?.number || initialReport.number || 'Номер не присвоен'
  }`

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title={`Бланк-заявка / ${pageTitle} / Отчеты`}
        headline={[
          {
            href: '/report',
            title: 'Отчеты'
          },
          {
            href: `/report/${initialReport.id}`,
            title: pageTitle
          },
          {
            title: 'Бланк-заявка'
          }
        ]}
        extra={
          <div className="flex gap-2">
            <Popover2
              content={
                <Menu>
                  <MenuDivider title="Скачать" />
                  <a
                    href={`${publicRuntimeConfig.API_URL}/report/${initialReport.id}/applicationform?token=${token}`}
                    target="_blank"
                  >
                    <MenuItem icon="cloud-download" text="Бланк-заявка" />
                  </a>
                  <a
                    href={`${publicRuntimeConfig.API_URL}/report/${initialReport.id}/registrationsticker?token=${token}`}
                    target="_blank"
                  >
                    <MenuItem
                      icon="cloud-download"
                      text="Регистрационная наклейка"
                    />
                  </a>
                  <MenuDivider title="Рекдактировать" />
                  <Link href={`/report/${initialReport.id}`}>
                    <MenuItem icon="edit" text="Отчет" />
                  </Link>
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
              Сохранить
            </Button>
          </div>
        }
      >
        <div
          className="space-y-8 max-w-full ml-auto mr-auto"
          style={{ width: 800 }}
        >
          <FormFieldSet title="Данные владельца техники/заказчика">
            <FormField label="Имя:">{initialReport.client?.name}</FormField>
            <FormField label="E-mail:">{initialReport.client?.email}</FormField>
            <FormField label="Организация:">{initialReport.client?.organization}</FormField>
            <FormField label="Телефон:">{initialReport.client?.phone}</FormField>
          </FormFieldSet>
          <FormFieldSet title="Информация о смазочном материале">
            <FormField label="Модель">{initialReport.lubricantEntity?.model}</FormField>
            <FormField label="Бренд">{initialReport.lubricantEntity?.brand}</FormField>
            <FormField label="Вязкость">{initialReport.lubricantEntity?.viscosity}</FormField>
            <FormField label="Состояние СМ">
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
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
          </FormFieldSet>
          <FormFieldSet title="Техника / точка отбора образца">
            {initialReport.vehicle && (
              <FormField label="Производитель оборудования:">
                {initialReport.vehicle.engineModel}
              </FormField>
            )}
            <FormField label="Производитель оборудования">
              <Controller
                name="vehicleEquipmentManufacturer"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Модель оборудования">
              <Controller
                name="vehicleEquipmentModel"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Регистрационный номер">
              <Controller
                name="vehicleRegistrationNumber"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Общая наработка узла">
              <Controller
                name="vehicleTotalOperatingTime"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Общая наработка на СМ">
              <Controller
                name="vehicleTotalOperatingTimeLubricant"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Долив СМ">
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
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Точка отбора образца">
              <Controller
                name="vehicleSamplingPoint"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Объём жидкости в оборудовании">
              <Controller
                name="vehicleLiquidVolume"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
          </FormFieldSet>
          <FormFieldSet title="Информация об отборе образца">
            <FormField label="Бренд">
              <Controller
                name="selectionBrand"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Объём образца">
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
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField label="Место отбора пробы">
              <Controller
                name="selectionPlace"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    inputRef={ref}
                    value={value || undefined}
                    {...field}
                  />
                )}
              />
            </FormField>
          </FormFieldSet>
          <FormField label="Примечание">
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
                  inputRef={ref}
                  value={value || undefined}
                  {...field}
                />
              )}
            />
          </FormField>
        </div>
      </MainTemplate>
    </form>
  )
}
