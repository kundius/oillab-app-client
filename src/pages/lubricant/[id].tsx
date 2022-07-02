import { GetServerSideProps } from 'next/types/custom'

import { createApolloClient } from '@app/lib/apolloClient'
import { UpdatePage, UpdatePageProps } from '@app/features/lubricant/components/UpdatePage'
import { LubricantUpdatePageQuery, LubricantUpdatePageQueryVariables, LubricantUpdatePageQueryDocument } from '@app/features/lubricant/components/UpdatePage/schema.generated'
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
      lubricant
    }
  } = await apolloClient.query<LubricantUpdatePageQuery, LubricantUpdatePageQueryVariables>({
    query: LubricantUpdatePageQueryDocument,
    variables: {
      id: parseInt(context.params.id)
    }
  })

  if (!lubricant) {
    return { notFound: true }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      initialLubricant: lubricant
    }
  }
}

export default withPageGuard({
  allowForRole: 'Administrator'
})(UpdatePage)
