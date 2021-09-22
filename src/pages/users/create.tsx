import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { CreatePage } from '@features/users/components/CreatePage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(CreatePage)
