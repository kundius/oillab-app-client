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
import * as types from '@app/types'

export interface UpdatePageProps {
  initialLubricant: schema.LubricantUpdatePageFragment
}

const Field = ({ label, children }) => (
  <div className="flex gap-4 items-center">
    <div className="leading-none">{label}</div>
    <div className="grow">{children}</div>
  </div>
)

export function UpdatePage({ initialLubricant }: UpdatePageProps) {
  const apollo = useApolloClient()
  const query = schema.useLubricantUpdatePageQuery({
    variables: {
      id: initialLubricant.id
    }
  })
  const [mutation, mutationState] = schema.useLubricantUpdatePageMutation()

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty }
  } = useForm<types.LubricantUpdateInput>({
    defaultValues: {
      model: initialLubricant.model || undefined,
      brand: initialLubricant.brand || undefined,
      viscosity: initialLubricant.viscosity || undefined
    }
  })

  const onSubmit = async (input: types.LubricantUpdateInput) => {
    const response = await mutation({
      variables: {
        id: initialLubricant.id,
        input
      }
    })

    if (response.data?.lubricantUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'lubricantPaginate'
      })
      AppToaster.show({
        message: 'Смазочный материал изменен',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.lubricantUpdate.error) {
      AppToaster.show({
        message: response.data.lubricantUpdate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const pageTitle = query.data?.lubricant?.model || initialLubricant.model

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title={`${pageTitle} / Смазочный материал`}
        headline={[
          {
            href: '/lubricant',
            title: 'Смазочный материал'
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
