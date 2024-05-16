import React, { useRef } from 'react'
import { useApolloClient } from '@apollo/client'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

import { AuthTemplate } from '@features/auth/components/AuthTemplate'
import { AppToaster, dismissToast, showToast } from '@components/AppToaster'
import { ErrorIcon } from '@components/ErrorIcon'

import * as styles from './styles.module.css'
import * as schema from './schema.generated'

export interface FormFields {
  email: string
  password: string
}

export const SignInPage = () => {
  const client = useApolloClient()
  const router = useRouter()
  const [signIn, signInState] = schema.useAuthSignInPageMutation()
  const { handleSubmit, control, reset } = useForm<FormFields>()

  const onSubmit = async (input: FormFields) => {
    const response = await signIn({
      variables: {
        input
      }
    })
    const mutation = response.data?.signIn
    const success = mutation?.success
    const error = mutation?.error

    if (success) {
      if (mutation?.token) {
        const cookies = new Cookies(document.cookie)
        cookies.set('token', mutation.token, { path: '/' })
      }
      await client.resetStore()
      reset()
      await showToast({
        message: 'Вы успешно авторизованы.',
        intent: Intent.SUCCESS
      })
      router.push('/')
    }

    if (error) {
      await showToast({
        message: error.message,
        intent: Intent.DANGER
      })
    }

    if (!(success || error)) {
      await showToast({
        message: 'Возникла непредвиденная ошибка, обратитесь в техподдержку.',
        intent: Intent.DANGER
      })
    }
  }

  return (
    <AuthTemplate title="Авторизация">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={styles.title}>Авторизация</div>
        <FormGroup label="E-mail:" labelFor="email">
          <Controller
            name="email"
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
                leftIcon="envelope"
                id="email"
                disabled={signInState.loading}
                rightElement={
                  !!error ? (
                    <ErrorIcon
                      message={error.message}
                      loading={signInState.loading}
                    />
                  ) : undefined
                }
                inputRef={ref}
                value={value || undefined}
                {...field}
              />
            )}
          />
        </FormGroup>
        <FormGroup label="Пароль:" labelFor="password">
          <Controller
            name="password"
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
                leftIcon="key"
                id="password"
                type="password"
                disabled={signInState.loading}
                rightElement={
                  !!error ? (
                    <ErrorIcon
                      message={error.message}
                      loading={signInState.loading}
                    />
                  ) : undefined
                }
                inputRef={ref}
                value={value || undefined}
                {...field}
              />
            )}
          />
        </FormGroup>
        <Button
          intent={Intent.PRIMARY}
          type="submit"
          loading={signInState.loading}
          disabled={signInState.loading}
        >
          Войти
        </Button>
      </form>
    </AuthTemplate>
  )
}
