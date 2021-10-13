import { GetServerSideProps } from 'next/types/custom'

import { createApolloClient } from '@app/lib/apolloClient'
import { UpdatePage, UpdatePageProps } from '@app/features/users/components/UpdatePage'
import { UsersUpdatePageQuery, UsersUpdatePageQueryVariables, UsersUpdatePageQueryDocument } from '@app/features/users/components/UpdatePage/schema.generated'
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
      user
    }
  } = await apolloClient.query<UsersUpdatePageQuery, UsersUpdatePageQueryVariables>({
    query: UsersUpdatePageQueryDocument,
    variables: {
      id: parseInt(context.params.id)
    }
  })

  if (!user) {
    return { notFound: true }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user
    }
  }
}

export default withPageGuard({
  allowForRole: 'Administrator'
})(UpdatePage)
