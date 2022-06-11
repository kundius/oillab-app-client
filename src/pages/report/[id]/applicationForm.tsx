import { GetServerSideProps } from 'next/types/custom'

import { createApolloClient } from '@app/lib/apolloClient'
import { ApplicationFormPage, ApplicationFormPageProps } from '@app/features/report/components/ApplicationFormPage'
import { ReportApplicationFormPageQuery, ReportApplicationFormPageQueryVariables, ReportApplicationFormPageQueryDocument } from '@app/features/report/components/ApplicationFormPage/schema.generated'
import { withPageGuard } from '@app/features/auth/hocs/withPageGuard'

export const getServerSideProps: GetServerSideProps<ApplicationFormPageProps> = async (context) => {
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
  } = await apolloClient.query<ReportApplicationFormPageQuery, ReportApplicationFormPageQueryVariables>({
    query: ReportApplicationFormPageQueryDocument,
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
  allowForRole: 'Administrator'
})(ApplicationFormPage)
