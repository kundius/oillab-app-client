import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { CreatePage } from '@features/brand/components/CreatePage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(CreatePage)
