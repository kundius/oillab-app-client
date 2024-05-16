import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VehicleDetailsForFormFragment = { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string };

export type VehicleDetailsForFormQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type VehicleDetailsForFormQuery = { __typename?: 'Query', vehicle?: { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string } | null };

export const VehicleDetailsForFormFragmentDoc = gql`
    fragment VehicleDetailsForFormFragment on Vehicle {
  id
  model
  releaseYear
  stateNumber
  engineModel
}
    `;
export const VehicleDetailsForFormQueryDocument = gql`
    query VehicleDetailsForFormQuery($id: Int!) {
  vehicle(id: $id) {
    ...VehicleDetailsForFormFragment
  }
}
    ${VehicleDetailsForFormFragmentDoc}`;

/**
 * __useVehicleDetailsForFormQuery__
 *
 * To run a query within a React component, call `useVehicleDetailsForFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleDetailsForFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleDetailsForFormQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVehicleDetailsForFormQuery(baseOptions: Apollo.QueryHookOptions<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables> & ({ variables: VehicleDetailsForFormQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>(VehicleDetailsForFormQueryDocument, options);
      }
export function useVehicleDetailsForFormQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>(VehicleDetailsForFormQueryDocument, options);
        }
export function useVehicleDetailsForFormQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>(VehicleDetailsForFormQueryDocument, options);
        }
export type VehicleDetailsForFormQueryHookResult = ReturnType<typeof useVehicleDetailsForFormQuery>;
export type VehicleDetailsForFormQueryLazyQueryHookResult = ReturnType<typeof useVehicleDetailsForFormQueryLazyQuery>;
export type VehicleDetailsForFormQuerySuspenseQueryHookResult = ReturnType<typeof useVehicleDetailsForFormQuerySuspenseQuery>;
export type VehicleDetailsForFormQueryQueryResult = Apollo.QueryResult<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>;