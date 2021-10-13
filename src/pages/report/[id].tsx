import { GetServerSideProps } from 'next/types/custom'

import { createApolloClient } from '@app/lib/apolloClient'
import { UpdatePage, UpdatePageProps } from '@app/features/report/components/UpdatePage'
import { ReportUpdatePageQuery, ReportUpdatePageQueryVariables, ReportUpdatePageQueryDocument } from '@app/features/report/components/UpdatePage/schema.generated'
import { withPageGuard } from '@app/features/auth/hocs/withPageGuard'

export const getServerSideProps: GetServerSideProps<UpdatePageProps> = async (context) => {
  const apolloClient = createApolloClient({
    context
  })

  if (!(context?.params?.id && typeof context.params.id === 'string')) {
    return { notFound: true }
  }

  const {
    data: {
      report
    }
  } = await apolloClient.query<ReportUpdatePageQuery, ReportUpdatePageQueryVariables>({
    query: ReportUpdatePageQueryDocument,
    variables: {
      id: parseInt(context.params.id)
    }
  })

  if (!report) {
    return { notFound: true }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      initialReport: report
    }
  }
}

export default withPageGuard({
  denyForGuest: true
})(UpdatePage)
