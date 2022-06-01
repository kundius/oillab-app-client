import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { Button, Dialog, InputGroup, Intent } from '@blueprintjs/core'

import { AppToaster } from '@components/AppToaster'

import * as schema from './schema.generated'
import * as types from '@app/types'

export interface UpdateApplicationFormModalApiParams {
  isLoading: boolean
  open: () => void
  close: () => void
}

export type UpdateApplicationFormModalApi = (
  params: UpdateApplicationFormModalApiParams
) => React.ReactNode

export interface UpdateApplicationFormModalProps {
  children: UpdateApplicationFormModalApi
  id: number
  initialData?: schema.ReportUpdateApplicationFormModalFragment
}

const Field = ({ label, children }) => (
  <div className="flex gap-4 items-center">
    <div className="leading-none">{label}</div>
    <div className="grow">{children}</div>
  </div>
)

const Fieldset = ({ title, children }) => (
  <div>
    <div className="font-bold text-lg mb-4">{title}</div>
    <div className="space-y-4">{children}</div>
  </div>
)

export function UpdateApplicationFormModal({
  children,
  id,
  initialData
}: UpdateApplicationFormModalProps) {
  const apollo = useApolloClient()
  const [mutation, mutationState] =
    schema.useReportUpdateApplicationFormModalMutation()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const {
    handleSubmit,
    control,
    formState: { isDirty }
  } = useForm<types.ReportUpdateApplicationFormInput>({
    defaultValues: {
      customerOrganization: initialData?.customerOrganization,
      customerPhone: initialData?.customerPhone,
      customerPerson: initialData?.customerPerson,
      customerEmail: initialData?.customerEmail,
      vehicleEquipmentManufacturer: initialData?.vehicleEquipmentManufacturer,
      vehicleRegistrationNumber: initialData?.vehicleRegistrationNumber,
      vehicleEquipmentModel: initialData?.vehicleEquipmentModel,
      vehicleTotalOperatingTime: initialData?.vehicleTotalOperatingTime,
      vehicleSamplingPoint: initialData?.vehicleSamplingPoint,
      vehicleTotalOperatingTimeLubricant:
        initialData?.vehicleTotalOperatingTimeLubricant,
      vehicleLiquidVolume: initialData?.vehicleLiquidVolume,
      vehicleToppingUpLubricant: initialData?.vehicleToppingUpLubricant,
      lubricantBrand: initialData?.lubricantBrand,
      lubricantViscosity: initialData?.lubricantViscosity,
      lubricantModel: initialData?.lubricantModel,
      lubricantState: initialData?.lubricantState,
      selectionType: initialData?.selectionType,
      selectionVolume: initialData?.selectionVolume,
      selectionPlace: initialData?.selectionPlace,
      note: initialData?.note
    }
  })

  const onSubmit = async (input: types.ReportUpdateApplicationFormInput) => {
    const response = await mutation({
      variables: {
        id,
        input
      }
    })
    if (response.data?.reportUpdateApplicationForm.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'reportPaginate'
      })
      AppToaster.show({
        message: 'Бланк изменен',
        intent: Intent.SUCCESS
      })
      handleClose()
    }
    if (response.data?.reportUpdateApplicationForm.error) {
      AppToaster.show({
        message: response.data.reportUpdateApplicationForm.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        icon="new-layer"
        onClose={handleClose}
        title="Редактировать бланк-заявку"
        style={{ paddingBottom: 0, width: 800 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 p-4">
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
          <Fieldset title="Информация об отборе образца топлива/охлаждающая жидкотсть">
            <Field label="Вид">
              <Controller
                name="selectionType"
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
          <Button
            intent={Intent.PRIMARY}
            type="submit"
            loading={mutationState.loading}
            disabled={mutationState.loading}
          >
            Сохранить
          </Button>
        </form>
      </Dialog>
      {children({
        isLoading: false,
        open: handleOpen,
        close: handleClose
      })}
    </>
  )
}
