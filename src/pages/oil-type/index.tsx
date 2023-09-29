import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { ListPage } from '@features/oil-type/components/ListPage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(ListPage)
