import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { ListPage } from '@features/vehicle/components/ListPage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(ListPage)
