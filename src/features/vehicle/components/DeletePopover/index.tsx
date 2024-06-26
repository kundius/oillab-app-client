import React from 'react'
import { useApolloClient } from '@apollo/client'
import { Intent } from '@blueprintjs/core'

import { AppToaster, showToast } from '@components/AppToaster'
import { DeletePopover as BaseDeletePopover } from '@components/DeletePopover'

import * as schema from './schema.generated'

export interface DeletePopoverApiParams {
  isLoading: boolean
}

export type DeletePopoverApi = (params: DeletePopoverApiParams) => React.ReactNode

export interface DeletePopoverProps {
  children: DeletePopoverApi
  onDelete?: () => void
  id: number
}

export function DeletePopover ({
  children,
  onDelete,
  id
}: DeletePopoverProps) {
  const apollo = useApolloClient()
  const [deleteMutation, deleteMutationState] = schema.useVehicleDeletePopoverMutation()

  const handleDeleteConfirm = async () => {
    const response = await deleteMutation({
      variables: {
        id
      }
    })
    
    if (response.data?.vehicleDelete.success) {
      onDelete?.()
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'vehiclePaginate'
      })
      await showToast({
        message: 'Техника удалена',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.vehicleDelete.error) {
      await showToast({
        message: response.data.vehicleDelete.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <BaseDeletePopover
      isLoading={deleteMutationState.loading}
      onConfirm={handleDeleteConfirm}
    >
      {children({
        isLoading: deleteMutationState.loading
      })}
    </BaseDeletePopover>
  )
}
