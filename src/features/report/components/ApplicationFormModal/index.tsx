import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { Button, Dialog, InputGroup, Intent } from '@blueprintjs/core'

import { AppToaster } from '@components/AppToaster'
import { FormFieldSet } from '@components/FormFieldSet'
import { FormField } from '@components/FormField'

import * as schema from './schema.generated'
import * as types from '@app/types'

export interface ApplicationFormModalApiParams {
  isLoading: boolean
  open: () => void
  close: () => void
}

export type ApplicationFormModalApi = (
  params: ApplicationFormModalApiParams
) => React.ReactNode

export interface ApplicationFormModalProps {
  children: ApplicationFormModalApi
  id: number
  initialData?: schema.ReportApplicationFormModalFragment
}

export function ApplicationFormModal({
  children,
  id,
  initialData
}: ApplicationFormModalProps) {
  const apollo = useApolloClient()
  const [mutation, mutationState] =
    schema.useReportApplicationFormModalMutation()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const {
    handleSubmit,
    control,
    formState: { isDirty }
  } = useForm<types.ReportUpdateApplicationFormInput>({
    defaultValues: {
      vehicleSamplingPoint: initialData?.vehicleSamplingPoint,
      vehicleToppingUpLubricant: initialData?.vehicleToppingUpLubricant,
      lubricantState: initialData?.lubricantState,
      selectionVolume: initialData?.selectionVolume,
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
        title="Бланк-заявка"
        style={{ paddingBottom: 0, width: 800 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 p-4">
          <FormFieldSet title="Информация о смазочном материале">
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
          <FormFieldSet title="Техника">
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
          </FormFieldSet>
          <FormFieldSet title="Информация об отборе образца">
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
          </FormFieldSet>
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
