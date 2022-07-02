import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { ListPage } from '@features/lubricant/components/ListPage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(ListPage)
