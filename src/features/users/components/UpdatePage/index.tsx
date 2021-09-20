import React, { useState, useEffect } from 'react'
import { Alert, Button, Classes, Dialog, Icon, InputGroup, Intent, PopperPlacements, Position, Switch, Tooltip } from '@blueprintjs/core'
import { useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'

import { MainTemplate } from '@features/app/components/MainTemplate'
import { AppToaster } from '@components/AppToaster'
import * as types from '@app/types'

import * as schema from './schema.generated'

export interface FormFields {
  name: string
  email: string
  password: string
}

export interface UpdatePageProps {
  user: schema.UsersUpdatePageFragment
}

export function UpdatePage ({ user }: UpdatePageProps) {
  const apollo = useApolloClient()
  const [mutation, mutationState] = schema.useUsersUpdatePageMutation()

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty }
  } = useForm<FormFields>({
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined
    }
  })

  const onSubmit = async (input: FormFields) => {
    const response = await mutation({
      variables: {
        id: user.id,
        input
      }
    })

    if (response.data?.userUpdate.success) {
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'userPaginate'
      })
      reset({
        name: response.data.userUpdate.record?.name || undefined,
        email: response.data.userUpdate.record?.email || undefined
      }, {
        keepDirty: false
      })
      AppToaster.show({
        message: 'Пользователь изменен',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.userUpdate.error) {
      AppToaster.show({
        message: response.data.userUpdate.error.message,
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
        title={`${user.name} / Пользователи`}
        headline={[{
          href: '/users',
          title: 'Пользователи'
        }, {
          title: user.name
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
            <div className="w-1/4 flex justify-end text-base">
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
                    large
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
            <div className="w-1/4 flex justify-end text-base">
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
                    large
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
            <div className="w-1/4 flex justify-end text-base">
              Пароль:
            </div>
            <div className="w-2/4 flex justify-start">
              <Controller
                name="password"
                control={control}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                <>
                  <InputGroup
                    asyncControl
                    large
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={!!error ? renderError(error.message) : undefined}
                    inputRef={ref}
                    value={value || ''}
                    {...field}
                  />
                  </>
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
