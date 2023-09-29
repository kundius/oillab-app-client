import { GetServerSideProps } from 'next/types/custom'

import { createApolloClient } from '@app/lib/apolloClient'
import { UpdatePage, UpdatePageProps } from '@app/features/oil-type/components/UpdatePage'
import { OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables, OilTypeUpdatePageQueryDocument } from '@app/features/oil-type/components/UpdatePage/schema.generated'
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
      oiltype
    }
  } = await apolloClient.query<OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables>({
    query: OilTypeUpdatePageQueryDocument,
    variables: {
      id: parseInt(context.params.id)
    }
  })

  if (!oiltype) {
    return { notFound: true }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      initialOiltype: oiltype
    }
  }
}

export default withPageGuard({
  allowForRole: 'Administrator'
})(UpdatePage)
