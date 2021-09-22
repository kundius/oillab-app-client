import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { CreatePage } from '@features/report/components/CreatePage'

export default withPageGuard({
  denyForGuest: true
})(CreatePage)
