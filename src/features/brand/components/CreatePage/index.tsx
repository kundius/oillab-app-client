import { useApolloClient } from '@apollo/client'
import * as types from '@app/types'
import { Button, InputGroup, Intent } from '@blueprintjs/core'
import { showToast } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { FormField } from '@components/FormField'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import * as schema from './schema.generated'

export interface FormFields extends types.BrandCreateInput {}

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useBrand_CreatePage_Mutation()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty }
  } = useForm<FormFields>()

  const onSubmit = async (input: FormFields) => {
    const response = await mutation({
      variables: {
        input
      }
    })

    if (response.data?.brandCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'brandPaginate'
      })
      await showToast({
        message: 'Бренд добавлен',
        intent: Intent.SUCCESS
      })
      router.push(`/brand/${response.data.brandCreate.record?.id}`)
    }

    if (response.data?.brandCreate.error) {
      await showToast({
        message: response.data.brandCreate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title="Добавление / Бренд"
        headline={[
          {
            href: '/brand',
            title: 'Бренд'
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
          <FormField label="Название">
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
        </div>
      </MainTemplate>
    </form>
  )
}
