import { useApolloClient, useQuery } from '@apollo/client'
import { Wall } from '@app/components/Wall'
import * as types from '@app/types'
import {
  Button,
  InputGroup,
  Intent,
  Position,
  Spinner,
  Tooltip
} from '@blueprintjs/core'
import { showToast } from '@components/AppToaster'
import { FormField } from '@components/FormField'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { Controller, useForm } from 'react-hook-form'
import * as schema from './schema.generated'
import {
  Select as SelectBrand,
  SelectValue as SelectBrandValue
} from '@features/brand/Select'
import { useState } from 'react'

export interface UserBrandsProps {
  id: number
}

export function UserBrands({ id }: UserBrandsProps) {
  const apollo = useApolloClient()
  const [selected, setSelected] = useState<SelectBrandValue | null | undefined>(
    undefined
  )
  const query = schema.useUsers_UserBrands_Query({
    variables: {
      id
    }
  })
  const [addMutation, addMutationState] =
    schema.useUsers_UserBrands_AddMutation()
  const [removeMutation, removeMutationState] =
    schema.useUsers_UserBrands_RemoveMutation()

  const addHandler = async () => {
    if (!selected) return

    const response = await addMutation({
      variables: {
        userId: id,
        brandId: selected.value
      }
    })

    if (response.data?.userAddBrand.success) {
      // apollo.cache.evict({
      //   id: 'ROOT_QUERY',
      //   fieldName: 'userPaginate'
      // })
      setSelected(null)
      await showToast({
        message: 'Бренд добавлен',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.userAddBrand.error) {
      await showToast({
        message: response.data.userAddBrand.error.message,
        intent: Intent.DANGER
      })
    }
  }

  const removeHandler = async (value: number) => {
    const response = await removeMutation({
      variables: {
        userId: id,
        brandId: value
      }
    })

    if (response.data?.userRemoveBrand.success) {
      // apollo.cache.evict({
      //   id: 'ROOT_QUERY',
      //   fieldName: 'userPaginate'
      // })
      await showToast({
        message: 'Бренд удален',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.userRemoveBrand.error) {
      await showToast({
        message: response.data.userRemoveBrand.error.message,
        intent: Intent.DANGER
      })
    }
  }

  if (query.loading) {
    return <Spinner />
  }

  if (!query.data?.user) {
    return <div>Пользователь не найден</div>
  }

  return (
    <div>
      <div className="flex gap-2">
        <SelectBrand value={selected} onChange={setSelected} />
        <Button
          onClick={addHandler}
          disabled={!selected}
          loading={addMutationState.loading}
        >
          Добавить
        </Button>
      </div>
      {query.data?.user.brands.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {query.data?.user.brands.map((item) => (
            <div key={item.id} className="flex items-center gap-2 rounded-md p-1.5 bg-gray-200">
              {item.name}
              <Button
                icon="cross"
                intent="danger"
                outlined
                small
                loading={removeMutationState.loading}
                onClick={() => removeHandler(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
