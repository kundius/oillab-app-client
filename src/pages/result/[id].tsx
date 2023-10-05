import { GetServerSideProps } from 'next/types/custom'

import { createApolloClient } from '@app/lib/apolloClient'
import { UpdatePage, UpdatePageProps } from '@app/features/result/components/UpdatePage'
import { ResultUpdatePageQuery, ResultUpdatePageQueryVariables, ResultUpdatePageQueryDocument } from '@app/features/result/components/UpdatePage/schema.generated'
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
      result
    }
  } = await apolloClient.query<ResultUpdatePageQuery, ResultUpdatePageQueryVariables>({
    query: ResultUpdatePageQueryDocument,
    variables: {
      id: parseInt(context.params.id)
    }
  })

  if (!result) {
    return { notFound: true }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      initialResult: result
    }
  }
}

export default withPageGuard({
  allowForRole: 'Administrator'
})(UpdatePage)
