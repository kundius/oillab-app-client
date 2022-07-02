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
import {
  Select as SelectUser,
  SelectValue as SelectUserValue
} from '@features/users/components/Select'

import * as schema from './schema.generated'

export interface FormFields {
  model: string
  releaseYear: string
  stateNumber: string
  engineModel: string
  owner: SelectUserValue
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
      owner: initialVehicle.owner
        ? {
            label: initialVehicle.owner.name,
            value: initialVehicle.owner.id
          }
        : undefined,
      engineModel: initialVehicle.engineModel || undefined
    }
  })

  const onSubmit = async ({ owner, ...input }: FormFields) => {
    const response = await mutation({
      variables: {
        id: initialVehicle.id,
        input: {
          ...input,
          owner: owner.value
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
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end leading-none text-right">
              Модель:
            </div>
            <div className="w-2/4 flex justify-start">
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
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end leading-none text-right">
              Год выпуска:
            </div>
            <div className="w-2/4 flex justify-start">
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
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end leading-none text-right">
              Гос номер:
            </div>
            <div className="w-2/4 flex justify-start">
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
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end leading-none text-right">
              Модель двигателя:
            </div>
            <div className="w-2/4 flex justify-start">
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
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end leading-none text-right">
              Владелец техники:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="owner"
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
            </div>
            <div className="w-1/4" />
          </div>
        </div>
      </MainTemplate>
    </form>
  )
}
