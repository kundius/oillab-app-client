import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { IndexPage } from '@app/features/mailing/components/IndexPage'

export default withPageGuard({
  allowForRole: 'Administrator'
})(IndexPage)
