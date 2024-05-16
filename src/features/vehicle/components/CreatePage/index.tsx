import React from 'react'
import { Button, InputGroup, Intent } from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'

import {
  Select as SelectUser,
  SelectValue as SelectUserValue
} from '@features/users/components/Select'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster, showToast } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'

import * as schema from './schema.generated'
import * as types from '@app/types'
import { FormField } from '@app/components/FormField'

export interface FormFields extends types.VehicleCreateInput {
  ownerEntity: SelectUserValue
}

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useVehicleCreatePageMutation()

  const {
    handleSubmit,
    control,
    formState: { isDirty }
  } = useForm<FormFields>()

  const onSubmit = async ({ ownerEntity, ...input }: FormFields) => {
    const response = await mutation({
      variables: {
        input: {
          ...input,
          owner: ownerEntity.value
        }
      }
    })

    if (response.data?.vehicleCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'vehiclePaginate'
      })
      await showToast({
        message: 'Техника добавлена',
        intent: Intent.SUCCESS
      })
      router.push(`/vehicle/${response.data.vehicleCreate.record?.id}`)
    }

    if (response.data?.vehicleCreate.error) {
      await showToast({
        message: response.data.vehicleCreate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title="Добавление / Техника"
        headline={[
          {
            href: '/vehicle',
            title: 'Техника'
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
          <FormField label="Гос номер:">
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
          <FormField label="Модель:">
            <Controller
              name="model"
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
          <FormField label="Год выпуска:">
            <Controller
              name="releaseYear"
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
          <FormField label="Модель двигателя:">
            <Controller
              name="engineModel"
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
          <FormField label="Объем жидкости в оборудовании:">
            <Controller
              name="liquidVolume"
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
          <FormField label="Владелец техники:">
            <Controller
              name="ownerEntity"
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <div className="inline-flex space-x-2">
                  <SelectUser {...field} />
                  {!!error && (
                    <ErrorIcon
                      message="Укажите владельца"
                      loading={mutationState.loading}
                    />
                  )}
                </div>
              )}
            />
          </FormField>
        </div>
      </MainTemplate>
    </form>
  )
}
