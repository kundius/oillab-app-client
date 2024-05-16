// import { OverlayToaster, Position } from '@blueprintjs/core'

// export const AppToaster = OverlayToaster.createAsync({
//   className: 'recipe-toaster',
//   position: Position.TOP,
//   maxToasts: 3
// })

import {
  OverlayToaster,
  Position,
  ToastProps,
  Toaster
} from '@blueprintjs/core'
import { createRoot } from 'react-dom/client'

export const AppToaster =
  typeof window !== 'undefined'
    ? OverlayToaster.createAsync(
        {
          className: 'recipe-toaster',
          position: Position.TOP,
          maxToasts: 3
        },
        {
          // Use createRoot() instead of ReactDOM.render(). This can be deleted after
          // a future Blueprint version uses createRoot() for Toasters by default.
          domRenderer: (toaster, containerElement) =>
            createRoot(containerElement).render(toaster)
        }
      )
    : ({} as Promise<Toaster>)

export const showToast = async (
  props: ToastProps,
  key?: string | undefined
) => {
  return (await AppToaster).show(props, key)
}

export const dismissToast = async (key: string) => {
  return (await AppToaster).dismiss(key)
}
