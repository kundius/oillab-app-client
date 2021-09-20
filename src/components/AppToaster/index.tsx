import { Toaster, Position, OverlayToaster } from '@blueprintjs/core'

export const AppToaster = typeof window !== 'undefined'
  ? OverlayToaster.create({
      position: Position.TOP,
      maxToasts: 3
    })
  : {} as Toaster
