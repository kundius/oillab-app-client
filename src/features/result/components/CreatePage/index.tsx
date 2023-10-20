import React from 'react'
import { Button, InputGroup, Intent } from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { FormField } from '@components/FormField'
import {
  Select as SelectOilType,
  SelectValue as SelectOilTypeValue
} from '@features/oil-type/components/Select'

import * as schema from './schema.generated'

interface FormFields {
  formNumber: string
  oilTypeEntity: SelectOilTypeValue
}

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useResultCreatePageMutation()

  const form = useForm<FormFields>()

  const onSubmit = async (input: FormFields) => {
    const response = await mutation({
      variables: {
        input: {
          formNumber: input.formNumber,
          oilTypeId: input.oilTypeEntity.value
        }
      }
    })

    if (response.data?.resultCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'resultPaginate'
      })
      AppToaster.show({
        message: 'Результат добавлен',
        intent: Intent.SUCCESS
      })
      router.push(`/result/${response.data.resultCreate.record?.id}`)
    }

    if (response.data?.resultCreate.error) {
      AppToaster.show({
        message: response.data.resultCreate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <MainTemplate
        title="Добавление / Результаты"
        headline={[
          {
            href: '/result',
            title: 'Результаты'
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
          <FormField label="Номер бланка">
            <Controller
              name="formNumber"
              control={form.control}
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
          <FormField label="Вид масла:">
            <Controller
              name="oilTypeEntity"
              control={form.control}
              rules={{
                required: 'Значение обязательно'
              }}
              render={({ field, fieldState }) => (
                <div className="flex gap-2 items-center">
                  <SelectOilType {...field} />
                  {!!fieldState.error && (
                    <ErrorIcon
                      message={fieldState.error.message}
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
