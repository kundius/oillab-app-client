import {
  default as RcPagination,
  PaginationProps as RcPaginationProps
} from 'rc-pagination'
import { Icon } from '@blueprintjs/core'

export function Pagination(props: RcPaginationProps) {
  return (
    <RcPagination
      prevIcon={() => <Icon icon="chevron-left" />}
      nextIcon={() => <Icon icon="chevron-right" />}
      prefixCls="app-pagination"
      {...props}
    />
  )
}
