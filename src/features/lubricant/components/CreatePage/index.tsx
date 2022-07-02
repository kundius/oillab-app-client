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
  Select as SelectUser,
  SelectValue as SelectUserValue
} from '@features/users/components/Select'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'

import * as schema from './schema.generated'
import * as types from '@app/types'

const Field = ({ label, children }) => (
  <div className="flex gap-4 items-center">
    <div className="leading-none">{label}</div>
    <div className="grow">{children}</div>
  </div>
)

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useLubricantCreatePageMutation()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty }
  } = useForm<types.LubricantCreateInput>()

  const onSubmit = async (input: types.LubricantCreateInput) => {
    const response = await mutation({
      variables: {
        input
      }
    })

    if (response.data?.lubricantCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'lubricantPaginate'
      })
      AppToaster.show({
        message: 'Смазочный материал добавлен',
        intent: Intent.SUCCESS
      })
      router.push(`/lubricant/${response.data.lubricantCreate.record?.id}`)
    }

    if (response.data?.lubricantCreate.error) {
      AppToaster.show({
        message: response.data.lubricantCreate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title="Добавление / Смазочный материал"
        headline={[
          {
            href: '/lubricant',
            title: 'Смазочный материал'
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
          <Field label="Модель">
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
          </Field>
          <Field label="Бренд">
            <Controller
              name="brand"
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
          </Field>
          <Field label="Вязкость">
            <Controller
              name="viscosity"
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
          </Field>
        </div>
      </MainTemplate>
    </form>
  )
}
