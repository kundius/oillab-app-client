import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { ListPage } from '@features/report/components/ListPage'

export default withPageGuard({
  denyForGuest: true
})(ListPage)
