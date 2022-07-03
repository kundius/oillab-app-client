import React, { useState, useEffect } from 'react'
import {
  Alert,
  Button,
  Classes,
  Dialog,
  Icon,
  InputGroup,
  Intent,
  Position,
  Switch,
  Tooltip
} from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { FormField } from '@components/FormField'
import {
  Select as SelectUser,
  SelectValue as SelectUserValue
} from '@features/users/components/Select'

import * as schema from './schema.generated'
import * as types from '@app/types'

export interface FormFields extends types.VehicleUpdateInput {
  ownerEntity: SelectUserValue
}

export interface UpdatePageProps {
  initialVehicle: schema.VehicleUpdatePageFragment
}

export function UpdatePage({ initialVehicle }: UpdatePageProps) {
  const apollo = useApolloClient()
  const query = schema.useVehicleUpdatePageQuery({
    variables: {
      id: initialVehicle.id
    }
  })
  const [mutation, mutationState] = schema.useVehicleUpdatePageMutation()

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty }
  } = useForm<FormFields>({
    defaultValues: {
      model: initialVehicle.model || undefined,
      releaseYear: initialVehicle.releaseYear || undefined,
      stateNumber: initialVehicle.stateNumber || undefined,
      ownerEntity: initialVehicle.owner
        ? {
            label: initialVehicle.owner.name,
            value: initialVehicle.owner.id
          }
        : undefined,
        engineModel: initialVehicle.engineModel || undefined,
        liquidVolume: initialVehicle.liquidVolume || undefined
    }
  })

  const onSubmit = async ({ ownerEntity, ...input }: FormFields) => {
    const response = await mutation({
      variables: {
        id: initialVehicle.id,
        input: {
          ...input,
          owner: ownerEntity.value
        }
      }
    })

    if (response.data?.vehicleUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'vehiclePaginate'
      })
      AppToaster.show({
        message: 'Техника изменена',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.vehicleUpdate.error) {
      AppToaster.show({
        message: response.data.vehicleUpdate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const pageTitle = query.data?.vehicle?.model || initialVehicle.model

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title={`${pageTitle} / Техника`}
        headline={[
          {
            href: '/vehicle',
            title: 'Техника'
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
              render={({
                field: { ref, ...field },
                fieldState: { error }
              }) => (
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
