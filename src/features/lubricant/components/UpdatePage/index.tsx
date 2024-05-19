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
import { Controller, useForm } from 'react-hook-form'
import * as schema from './schema.generated'

export interface UpdatePageProps {
  initialLubricant: schema.LubricantUpdatePageFragment
}

export interface FormFields extends types.LubricantUpdateInput {
  brandEntity: SelectBrandValue
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
  } = useForm<FormFields>({
    defaultValues: {
      model: initialLubricant.model || undefined,
      brandEntity: initialLubricant.brandEntity
        ? {
            label: initialLubricant.brandEntity.name,
            value: initialLubricant.brandEntity.id
          }
        : undefined,
      viscosity: initialLubricant.viscosity || undefined,
      productType: initialLubricant.productType || undefined
    }
  })

  const onSubmit = async ({ brandEntity, ...input }: FormFields) => {
    const response = await mutation({
      variables: {
        id: initialLubricant.id,
        input: {
          ...input,
          brandId: brandEntity.value
        }
      }
    })

    if (response.data?.lubricantUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'lubricantPaginate'
      })
      await showToast({
        message: 'Смазочный материал изменен',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.lubricantUpdate.error) {
      await showToast({
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
