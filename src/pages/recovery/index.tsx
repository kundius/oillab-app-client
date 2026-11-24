import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { IndexPage } from '@app/features/recovery/components/IndexPage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(IndexPage)
