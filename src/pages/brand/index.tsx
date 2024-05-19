import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { ListPage } from '@features/brand/ListPage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(ListPage)
