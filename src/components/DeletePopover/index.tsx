import React from 'react'
import { Button, Popover, H5, Classes, Intent } from '@blueprintjs/core'

import classNames from 'classnames'

export interface DeletePopoverProps {
  onConfirm?: () => void
  isLoading?: boolean
}

export function DeletePopover ({
  children,
  onConfirm,
  isLoading = false
}: React.PropsWithChildren<DeletePopoverProps>) {
  return (
    <Popover
      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      content={(
        <div key="text">
          <H5>Подтвердите удаление</H5>
          <p>Вы действительно хотите сделать это?</p>
          <div className="flex justify-end mt-4">
            <Button className={classNames(Classes.POPOVER_DISMISS, 'mr-2')}>
              Отмена
            </Button>
            <Button
              intent={Intent.DANGER}
              className={Classes.POPOVER_DISMISS}
              onClick={onConfirm}
              loading={isLoading}
            >
              Удалить
            </Button>
          </div>
        </div>
      )}
    >
      {children}
    </Popover>
  )
}
