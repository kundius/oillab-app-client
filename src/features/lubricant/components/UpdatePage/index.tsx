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

export interface UpdatePageProps {
  initialLubricant: schema.LubricantUpdatePageFragment
}

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
      viscosity: initialLubricant.viscosity || undefined,
      productType: initialLubricant.productType || undefined
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
          <FormField label="Тип продукта">
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
                    <option value="">Выбрать тип продукта...</option>
                    <option value="Fuel">Топливо</option>
                    <option value="Oil">Масло</option>
                    <option value="Coolant">Охлаждающая жидкость</option>
                  </select>
                  <span className="bp4-icon bp4-icon-double-caret-vertical"></span>
                </div>
              )}
            />
          </FormField>
          <FormField label="Модель">
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
          <FormField label="Бренд">
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
          </FormField>
          <FormField label="Вязкость">
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
          </FormField>
        </div>
      </MainTemplate>
    </form>
  )
}
