import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { ListPage } from '@features/users/components/ListPage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(ListPage)
