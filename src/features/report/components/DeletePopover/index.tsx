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
  const [deleteMutation, deleteMutationState] = schema.useReportDeletePopoverMutation()

  const handleDeleteConfirm = async () => {
    const response = await deleteMutation({
      variables: {
        id
      }
    })
    
    if (response.data?.reportDelete.success) {
      onDelete?.()
      apollo.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'reportPaginate'
      })
      AppToaster.show({
        message: 'Отчет удален',
        intent: Intent.SUCCESS
      })
    }

    if (response.data?.reportDelete.error) {
      AppToaster.show({
        message: response.data.reportDelete.error.message,
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
