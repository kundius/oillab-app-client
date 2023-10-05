import React from 'react'
import { useApolloClient } from '@apollo/client'
import { Intent } from '@blueprintjs/core'

import { AppToaster } from '@components/AppToaster'
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
  const [deleteMutation, deleteMutationState] = schema.useResultDeletePopoverMutation()

  const handleDeleteConfirm = async () => {
    const response = await deleteMutation({
      variables: {
        id
      }
    })
    
    if (response.data?.resultDelete.success) {
      onDelete?.()
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'resultPaginate'
      })
      AppToaster.show({
        message: 'Удалено',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.resultDelete.error) {
      AppToaster.show({
        message: response.data.resultDelete.error.message,
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
