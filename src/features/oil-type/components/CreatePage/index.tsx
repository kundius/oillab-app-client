import React from 'react'
import {
  Button,
  Checkbox,
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
import { AppToaster, showToast } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { FormField } from '@components/FormField'

import * as schema from './schema.generated'
import * as types from '@app/types'

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useOilTypeCreatePageMutation()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty }
  } = useForm<types.OilTypeCreateInput>({
    defaultValues: {
      standard: false
    }
  })

  const onSubmit = async (input: types.OilTypeCreateInput) => {
    const response = await mutation({
      variables: {
        input
      }
    })

    if (response.data?.oiltypeCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'oiltypePaginate'
      })
      await showToast({
        message: 'Вид масла добавлен',
        intent: Intent.SUCCESS
      })
      router.push(`/oil-type/${response.data.oiltypeCreate.record?.id}`)
    }

    if (response.data?.oiltypeCreate.error) {
      await showToast({
        message: response.data.oiltypeCreate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title="Добавление / Вид масел"
        headline={[
          {
            href: '/oil-type',
            title: 'Вид масел'
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
                  checked={value}
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
