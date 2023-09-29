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
  Checkbox
} from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { FormField } from '@components/FormField'

import * as schema from './schema.generated'
import * as types from '@app/types'

export interface UpdatePageProps {
  initialOiltype: schema.OilTypeUpdatePageFragment
}

export function UpdatePage({ initialOiltype }: UpdatePageProps) {
  const apollo = useApolloClient()
  const query = schema.useOilTypeUpdatePageQuery({
    variables: {
      id: initialOiltype.id
    }
  })
  const [mutation, mutationState] = schema.useOilTypeUpdatePageMutation()

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty }
  } = useForm<types.OilTypeUpdateInput>({
    defaultValues: {
      name: initialOiltype.name || undefined,
      standard: initialOiltype.standard || false
    }
  })

  const onSubmit = async (input: types.OilTypeUpdateInput) => {
    const response = await mutation({
      variables: {
        id: initialOiltype.id,
        input
      }
    })

    if (response.data?.oiltypeUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'oiltypePaginate'
      })
      AppToaster.show({
        message: 'Вид масла изменен',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.oiltypeUpdate.error) {
      AppToaster.show({
        message: response.data.oiltypeUpdate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const pageTitle = query.data?.oiltype?.name || initialOiltype.name

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title={`${pageTitle} / Вид масла`}
        headline={[
          {
            href: '/oil-type',
            title: 'Вид масла'
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
          <FormField label="Вид масла">
            <Controller
              name="name"
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
          <FormField label="Стандартное">
            <Controller
              name="standard"
              control={control}
              render={({
                field: { ref, value, onChange, ...field },
                fieldState: { error }
              }) => (
                <Checkbox
                  checked={value || false}
                  onChange={onChange}
                  inputRef={ref}
                  large
                  className="m-0"
                  disabled={mutationState.loading}
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
