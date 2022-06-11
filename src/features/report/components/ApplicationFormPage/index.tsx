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

import * as schema from './schema.generated'
import * as types from '@app/types'
import { useToken } from '@app/features/app/hooks/useToken'

const { publicRuntimeConfig } = getRuntimeConfig()

export interface ApplicationFormPageProps {
  initialReport: schema.ReportApplicationFormPageFragment
}

const Field = ({ label, children }) => (
  <div className="flex gap-8 items-center">
    <div className="w-1/4 flex justify-end leading-none text-right">
      {label}
    </div>
    <div className="w-2/4 flex justify-start">{children}</div>
  </div>
)

const Fieldset = ({ title, children }) => (
  <div>
    <div className="font-bold text-lg mb-4">{title}</div>
    <div className="space-y-4">{children}</div>
  </div>
)

const getDefaultValues = (data: schema.ReportApplicationFormPageFragment) => {
  const af = data?.applicationForm
  if (af) {
    return {
      productType: af.productType,
      customerOrganization: af.customerOrganization,
      customerPhone: af.customerPhone,
      customerPerson: af.customerPerson,
      customerEmail: af.customerEmail,
      vehicleEquipmentManufacturer: af.vehicleEquipmentManufacturer,
      vehicleRegistrationNumber: af.vehicleRegistrationNumber,
      vehicleEquipmentModel: af.vehicleEquipmentModel,
      vehicleTotalOperatingTime: af.vehicleTotalOperatingTime,
      vehicleSamplingPoint: af.vehicleSamplingPoint,
      vehicleTotalOperatingTimeLubricant: af.vehicleTotalOperatingTimeLubricant,
      vehicleLiquidVolume: af.vehicleLiquidVolume,
      vehicleToppingUpLubricant: af.vehicleToppingUpLubricant,
      lubricantBrand: af.lubricantBrand,
      lubricantViscosity: af.lubricantViscosity,
      lubricantModel: af.lubricantModel,
      lubricantState: af.lubricantState,
      selectionVolume: af.selectionVolume,
      selectionPlace: af.selectionPlace,
      note: af.note
    }
  }
  return {
    customerOrganization: data?.client?.name,
    vehicleRegistrationNumber: data?.vehicle?.stateNumber,
    vehicleTotalOperatingTime: data?.totalMileage,
    vehicleTotalOperatingTimeLubricant: data?.lubricantMileage,
    vehicleEquipmentModel: data?.vehicle?.engineModel,
  }
}

export function ApplicationFormPage({
  initialReport
}: ApplicationFormPageProps) {
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
    setValue,
    reset,
    watch,
    formState: { isDirty }
  } = useForm<types.ReportUpdateApplicationFormInput>({
    defaultValues: getDefaultValues(initialReport)
  })
  const token = useToken()

  const onSubmit = async (input: types.ReportUpdateApplicationFormInput) => {
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
                  <Link
                    href={`/report/${initialReport.id}`}
                  >
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
          <Fieldset title="Данные владельца техники/заказчика">
            <Field label="Организация">
              <Controller
                name="customerOrganization"
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
            </Field>
            <Field label="Контактное лицо">
              <Controller
                name="customerPerson"
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
            </Field>
            <Field label="Контактный телефон">
              <Controller
                name="customerPhone"
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
            </Field>
            <Field label="Электронная почта">
              <Controller
                name="customerEmail"
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
            </Field>
          </Fieldset>
          <Fieldset title="Информация о смазочном материале">
            <Field label="Бренд СМ">
              <Controller
                name="lubricantBrand"
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
            </Field>
            <Field label="Марка СМ">
              <Controller
                name="lubricantModel"
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
            </Field>
            <Field label="Вязкость">
              <Controller
                name="lubricantViscosity"
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
            </Field>
            <Field label="Состояние СМ">
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
            </Field>
          </Fieldset>
          <Fieldset title="Техника / точка отбора образца">
            <Field label="Производитель оборудования">
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
            </Field>
            <Field label="Модель оборудования">
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
            </Field>
            <Field label="Регистрационный номер">
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
            </Field>
            <Field label="Общая наработка узла">
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
            </Field>
            <Field label="Общая наработка на СМ">
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
            </Field>
            <Field label="Долив СМ">
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
            </Field>
            <Field label="Точка отбора образца">
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
            </Field>
            <Field label="Объём жидкости в оборудовании">
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
            </Field>
          </Fieldset>
          <Fieldset title="Информация об отборе образца">
            <Field label="Тип продукта">
              <Controller
                name="productType"
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
                      <option>Выбрать тип продукта...</option>
                      <option value="Fuel">Топливо</option>
                      <option value="Oil">Масло</option>
                      <option value="Coolant">Охлаждающая жидкость</option>
                    </select>
                    <span className="bp4-icon bp4-icon-double-caret-vertical"></span>
                  </div>
                )}
              />
            </Field>
            <Field label="Бренд">
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
            </Field>
            <Field label="Объём образца">
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
            </Field>
            <Field label="Место отбора пробы">
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
            </Field>
          </Fieldset>
          <Field label="Примечание">
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
          </Field>
        </div>
      </MainTemplate>
    </form>
  )
}
