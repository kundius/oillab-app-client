import { useApolloClient } from '@apollo/client'
import * as types from '@app/types'
import { Button, InputGroup, Intent } from '@blueprintjs/core'
import { showToast } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'
import { FormField } from '@components/FormField'
import { MainTemplate } from '@features/app/components/MainTemplate'
import {
  Select as SelectBrand,
  SelectValue as SelectBrandValue
} from '@features/brand/Select'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import * as schema from './schema.generated'

export interface FormFields extends types.LubricantCreateInput {
  brandEntity: SelectBrandValue
}

export function CreatePage() {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useLubricantCreatePageMutation()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty }
  } = useForm<FormFields>()

  const onSubmit = async ({ brandEntity, ...input }: FormFields) => {
    const response = await mutation({
      variables: {
        input: {
          ...input,
          brandId: brandEntity.value
        }
      }
    })

    if (response.data?.lubricantCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'lubricantPaginate'
      })
      await showToast({
        message: 'Смазочный материал добавлен',
        intent: Intent.SUCCESS
      })
      router.push(`/lubricant/${response.data.lubricantCreate.record?.id}`)
    }

    if (response.data?.lubricantCreate.error) {
      await showToast({
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
          <FormField label="Тип продукта">
            <Controller
              name="productType"
              control={control}
              render={({
                field: { value, ...field },
                fieldState: { error }
              }) => (
                <div className="bp5-html-select">
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
                  <span className="bp5-icon bp5-icon-double-caret-vertical"></span>
                </div>
              )}
            />
          </FormField>
          <FormField label="Бренд">
            <Controller
              name="brandEntity"
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <div className="inline-flex space-x-2">
                  <SelectBrand {...field} />
                  {!!error && (
                    <ErrorIcon
                      message="Укажите бренд"
                      loading={mutationState.loading}
                    />
                  )}
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
          <FormField label="Вязкость">
            <Controller
              name="viscosity"
              control={control}
              render={({
                field: { ref, value, ...field },
                fieldState: { error }
              }) => (
                <InputGroup
                  className="w-full"
                  disabled={mutationState.loading}
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
