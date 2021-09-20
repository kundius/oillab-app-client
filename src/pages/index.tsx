import { withPageGuard } from '@features/auth/hocs/withPageGuard'
import { Page } from '@features/home/components/Page'

export default Page
// export default withPageGuard({
//   allowForType: 'Administrator'
// })(Page)

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/report',
      permanent: false
    }
  }
}
