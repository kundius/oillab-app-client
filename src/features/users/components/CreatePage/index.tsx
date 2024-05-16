import React from 'react'
import { Button, InputGroup, Intent, Position, Tooltip } from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { useRouter }  from 'next/router'

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster, showToast } from '@components/AppToaster'
import { FormField } from '@components/FormField'
import * as types from '@app/types'

import * as schema from './schema.generated'

export function CreatePage () {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useUsersCreatePageMutation()

  const {
    handleSubmit,
    control,
    formState: { isDirty }
  } = useForm<types.UserCreateInput>()

  const onSubmit = async (input: types.UserCreateInput) => {
    const response = await mutation({
      variables: {
        input
      }
    })

    if (response.data?.userCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'userPaginate'
      })
      await showToast({
        message: 'Пользователь добавлен',
        intent: Intent.SUCCESS
      })
      router.push(`/users/${response.data.userCreate.record?.id}`)
    }

    if (response.data?.userCreate.error) {
      await showToast({
        message: response.data.userCreate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const renderError = (message?: string) => (
    <Tooltip
      intent={Intent.DANGER}
      content={message || 'Ошибка ввода!'}
      disabled={mutationState.loading}
      placement={Position.RIGHT}
    >
      <Button
        disabled={mutationState.loading}
        icon="error"
        intent={Intent.DANGER}
        minimal
      />
    </Tooltip>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainTemplate
        title="Добавление нового / Пользователи"
        headline={[{
          href: '/users',
          title: 'Пользователи'
        }, {
          title: 'Добавление нового'
        }]}
        extra={(
          <Button
            intent={Intent.PRIMARY}
            type="submit"
            loading={mutationState.loading}
            disabled={mutationState.loading}
          >
            Сохранить
          </Button>
        )}
      >
        <div
          className="space-y-8 max-w-full ml-auto mr-auto"
          style={{ width: 800 }}
        >
          <FormField label="Владелец техники:">
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Введите название:'
              }}
              render={({
                field: { ref, value, ...field },
                fieldState: { error }
              }) => (
                <InputGroup
                  className="w-full"
                  disabled={mutationState.loading}
                  rightElement={!!error ? renderError(error.message) : undefined}
                  inputRef={ref}
                  value={value || undefined}
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField label="E-mail:">
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Введите e-mail:'
              }}
              render={({
                field: { ref, value, ...field },
                fieldState: { error }
              }) => (
                <InputGroup
                  className="w-full"
                  disabled={mutationState.loading}
                  rightElement={!!error ? renderError(error.message) : undefined}
                  inputRef={ref}
                  value={value || undefined}
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField label="Контактное лицо:">
            <Controller
              name="contactPerson"
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
          <FormField label="Телефон:">
            <Controller
              name="phone"
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
          <FormField label="Пароль:">
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Введите пароль'
              }}
              render={({
                field: { ref, value, ...field },
                fieldState: { error }
              }) => (
                <InputGroup
                  className="w-full"
                  disabled={mutationState.loading}
                  rightElement={!!error ? renderError(error.message) : undefined}
                  inputRef={ref}
                  value={value || undefined}
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField label="Роль:">
            <Controller
              name="role"
              control={control}
              rules={{
                required: 'Выберите роль'
              }}
              render={({
                field: { value, ...field },
                fieldState: { error }
              }) => (
                <div className="bp5-html-select">
                  <select {...field}>
                    <option value="" selected={!value}>Выбрать роль...</option>
                    <option value="Member" selected={value === 'Member'}>Member</option>
                    <option value="Administrator" selected={value === 'Administrator'}>Administrator</option>
                    <option value="Manager" selected={value === 'Manager'}>Manager</option>
                  </select>
                  <span className="bp5-icon bp5-icon-double-caret-vertical"></span>
                </div>
              )}
            />
          </FormField>
        </div>
      </MainTemplate>
    </form>
  )
}
