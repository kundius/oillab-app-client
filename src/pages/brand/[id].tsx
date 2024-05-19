import { GetServerSideProps } from 'next/types/custom'

import { createApolloClient } from '@app/lib/apolloClient'
import { UpdatePage, UpdatePageProps } from '@app/features/brand/UpdatePage'
import { Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables, Brand_UpdatePage_QueryDocument } from '@app/features/brand/UpdatePage/schema.generated'
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
      brand
    }
  } = await apolloClient.query<Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables>({
    query: Brand_UpdatePage_QueryDocument,
    variables: {
      id: parseInt(context.params.id)
    }
  })

  if (!brand) {
    return { notFound: true }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      initialBrand: brand
    }
  }
}

export default withPageGuard({
  allowForRole: 'Administrator'
})(UpdatePage)
