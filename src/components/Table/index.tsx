import { default as RcTable } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { TableProps as RcTableProps } from 'rc-table/lib/Table'

import { Title } from './Title'

export type TableProps<RecordType> = Omit<RcTableProps<RecordType>, 'prefixCls'>

export function Table<RecordType extends DefaultRecordType> (props: TableProps<RecordType>) {
  return <RcTable prefixCls="app-table" {...props} />
}

Table.Column = RcTable.Column
Table.ColumnGroup = RcTable.ColumnGroup
Table.Title = Title
