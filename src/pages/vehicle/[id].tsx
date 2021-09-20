import { GetServerSideProps } from 'next/types/custom'

import { createApolloClient } from '@app/lib/apolloClient'
import { UpdatePage, UpdatePageProps } from '@app/features/vehicle/components/UpdatePage'
import { VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables, VehicleUpdatePageQueryDocument } from '@app/features/vehicle/components/UpdatePage/schema.generated'

export const getServerSideProps: GetServerSideProps<UpdatePageProps> = async (context) => {
  const apolloClient = createApolloClient({
    context
  })

  if (!(context?.params?.id && typeof context.params.id === 'string')) {
    return { notFound: true }
  }

  const {
    data: {
      vehicle
    }
  } = await apolloClient.query<VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables>({
    query: VehicleUpdatePageQueryDocument,
    variables: {
      id: context.params.id
    }
  })

  if (!vehicle) {
    return { notFound: true }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      initialVehicle: vehicle
    }
  }
}

export default UpdatePage
