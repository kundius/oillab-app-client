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
  SelectUser,
  SelectUserValue
} from '@features/users/components/SelectUser'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'

import * as schema from './schema.generated'

export interface FormFields {
  model: string
  releaseYear: string
  stateNumber: string
  engineModel: string
  generalOperatingTime: string
  owner: SelectUserValue
}

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useVehicleCreatePageMutation()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty }
  } = useForm<FormFields>()

  const onSubmit = async ({ owner, ...input }: FormFields) => {
    const response = await mutation({
      variables: {
        input: {
          ...input,
          owner: owner.value
        }
      }
    })

    if (response.data?.vehicleCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'vehiclePaginate'
      })
      AppToaster.show({
        message: 'Техника добавлена',
        intent: Intent.SUCCESS
      })
      router.push(`/vehicle/${response.data.vehicleCreate.record?.id}`)
    }

    if (response.data?.vehicleCreate.error) {
      AppToaster.show({
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
              Общая наработка техники:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="generalOperatingTime"
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
