import { useApolloClient } from '@apollo/client'
import { Wall } from '@app/components/Wall'
import * as types from '@app/types'
import {
  Button,
  InputGroup,
  Intent,
  Position,
  Tooltip
} from '@blueprintjs/core'
import { showToast } from '@components/AppToaster'
import { FormField } from '@components/FormField'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { Controller, useForm } from 'react-hook-form'
import { UserBrands } from '../UserBrands'
import * as schema from './schema.generated'

export interface UpdatePageProps {
  user: schema.UsersUpdatePageFragment
}

export function UpdatePage({ user }: UpdatePageProps) {
  const apollo = useApolloClient()
  const [mutation, mutationState] = schema.useUsersUpdatePageMutation()

  const {
    handleSubmit,
    control,
    resetField,
    formState: { isDirty }
  } = useForm<types.UserUpdateInput>({
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      role: user.role || undefined,
      contactPerson: user.contactPerson || undefined,
      phone: user.phone || undefined
    }
  })

  const onSubmit = async (input: types.UserUpdateInput) => {
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
      resetField('password')
      await showToast({
        message: 'Пользователь изменен',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.userUpdate.error) {
      await showToast({
        message: response.data.userUpdate.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const submitHandler = handleSubmit(onSubmit)

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
    <MainTemplate
      title={`${user.name} / Пользователи`}
      headline={[
        {
          href: '/users',
          title: 'Пользователи'
        },
        {
          title: user.name
        }
      ]}
      extra={
        <Button
          intent={Intent.PRIMARY}
          type="button"
          onClick={submitHandler}
          loading={mutationState.loading}
          disabled={mutationState.loading}
        >
          Сохранить
        </Button>
      }
    >
      <Wall>
        <form onSubmit={submitHandler}>
          <div
            className="space-y-8 max-w-full ml-auto mr-auto"
            style={{ width: 800 }}
          >
            <FormField label="Владелец техники:">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Введите название'
                }}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={
                      !!error ? renderError(error.message) : undefined
                    }
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
                  required: 'Введите e-mail'
                }}
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <InputGroup
                    className="w-full"
                    disabled={mutationState.loading}
                    rightElement={
                      !!error ? renderError(error.message) : undefined
                    }
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
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error }
                }) => (
                  <>
                    <InputGroup
                      asyncControl
                      className="w-full"
                      disabled={mutationState.loading}
                      rightElement={
                        !!error ? renderError(error.message) : undefined
                      }
                      inputRef={ref}
                      value={value || ''}
                      {...field}
                    />
                  </>
                )}
              />
            </FormField>
            <FormField label="Бренды:">
              <UserBrands id={user.id} />
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
                      <option value="" selected={!value}>
                        Выбрать роль...
                      </option>
                      <option value="Member" selected={value === 'Member'}>
                        Member
                      </option>
                      <option
                        value="Administrator"
                        selected={value === 'Administrator'}
                      >
                        Administrator
                      </option>
                      <option value="Manager" selected={value === 'Manager'}>
                        Manager
                      </option>
                    </select>
                    <span className="bp5-icon bp5-icon-double-caret-vertical"></span>
                  </div>
                )}
              />
            </FormField>
          </div>
        </form>
      </Wall>
    </MainTemplate>
  )
}
