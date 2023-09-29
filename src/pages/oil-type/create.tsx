import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { CreatePage } from '@features/oil-type/components/CreatePage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(CreatePage)
