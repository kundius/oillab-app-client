import React from 'react'
import { Button, InputGroup, Intent, Position, Tooltip } from '@blueprintjs/core'

export interface ErrorIconProps {
  message?: string
  loading: boolean
}

export const ErrorIcon = ({
  message,
  loading
}) => {
  return (
    <Tooltip
      intent={Intent.DANGER}
      content={message || 'Ошибка ввода!'}
      disabled={loading}
      placement={Position.RIGHT}
    >
      <Button
        disabled={loading}
        icon="error"
        intent={Intent.DANGER}
        minimal
      />
    </Tooltip>
  )
}
