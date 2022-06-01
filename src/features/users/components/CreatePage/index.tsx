import React, { useState, useEffect } from 'react'
import { Alert, Button, Classes, Dialog, Icon, InputGroup, Intent, Position, Switch, Tooltip } from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'
import { useRouter }  from 'next/router'

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import * as types from '@app/types'

import * as schema from './schema.generated'

export interface FormFields {
  name: string
  email: string
  password: string
  role: string
}

export function CreatePage () {
  const apollo = useApolloClient()
  const router = useRouter()
  const [mutation, mutationState] = schema.useUsersCreatePageMutation()

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

    if (response.data?.userCreate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'userPaginate'
      })
      AppToaster.show({
        message: 'Пользователь добавлен',
        intent: Intent.SUCCESS
      })
      router.push(`/users/${response.data.userCreate.record?.id}`)
    }

    if (response.data?.userCreate.error) {
      AppToaster.show({
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
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end">
              Имя:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Введите имя'
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
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end">
              E-mail:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Введите e-mail'
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
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end">
              Пароль:
            </div>
            <div className="w-2/4 flex justify-start">
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
            </div>
            <div className="w-1/4" />
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-1/4 flex justify-end">
              Роль:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="role"
                control={control}
                render={({
                  field: { value, ...field },
                  fieldState: { error }
                }) => (
                  <div className="bp4-html-select">
                    <select {...field}>
                      <option selected={!value}>Выбрать роль...</option>
                      <option value="Member" selected={value === 'Member'}>Member</option>
                      <option value="Administrator" selected={value === 'Administrator'}>Administrator</option>
                      <option value="Manager" selected={value === 'Manager'}>Manager</option>
                    </select>
                    <span className="bp4-icon bp4-icon-double-caret-vertical"></span>
                  </div>
                )}
              />
            </div>
            <div className="w-1/4" />
          </div>
        </div>
      </MainTemplate>
    </form>
  )
}
