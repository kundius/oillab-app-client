import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { CreatePage } from '@features/brand/CreatePage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(CreatePage)
