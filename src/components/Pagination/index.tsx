import { default as RcPagination, PaginationProps as RcPaginationProps } from 'rc-pagination'

export function Pagination (props: RcPaginationProps) {
  return <RcPagination prefixCls="app-pagination" {...props} />
}
