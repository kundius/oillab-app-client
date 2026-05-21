import { useApolloClient } from '@apollo/client'
import * as types from '@app/types'
import { Button, InputGroup, Intent } from '@blueprintjs/core'
import { showToast } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { FormField } from '@components/FormField'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { Controller, useForm } from 'react-hook-form'
import * as schema from './schema.generated'

export interface UpdatePageProps {
  initialBrand: schema.Brand_UpdatePage_Fragment
}

export interface FormFields extends types.BrandUpdateInput {}

export function UpdatePage({ initialBrand }: UpdatePageProps) {
  const apollo = useApolloClient()
  const query = schema.useBrand_UpdatePage_Query({
    variables: {
      id: initialBrand.id
    }
  })
  const [mutation, mutationState] = schema.useBrand_UpdatePage_Mutation()

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty }
  } = useForm<FormFields>({
    defaultValues: {
      name: initialBrand.name || undefined
    }
  })

  const onSubmit = async (input: FormFields) => {
    const response = await mutation({
      variables: {
        id: initialBrand.id,
        input
      }
    })

    if (response.data?.brandUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'brandPaginate'
      })
      await showToast({
        message: 'Бренд изменен',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.brandUpdate.error) {
      await showToast({
        message: response.data.brandUpdate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const pageTitle = query.data?.brand?.name || initialBrand.name

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title={`${pageTitle} / Бренд`}
        headline={[
          {
            href: '/brand',
            title: 'Бренд'
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
