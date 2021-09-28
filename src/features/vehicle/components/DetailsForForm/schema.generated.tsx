import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type VehicleDetailsForFormFragment = { __typename?: 'Vehicle', id: string, model: string, releaseYear: string, stateNumber: string, engineModel: string };

export type VehicleDetailsForFormQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type VehicleDetailsForFormQuery = { __typename?: 'Query', vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: string, model: string, releaseYear: string, stateNumber: string, engineModel: string }> };

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
    query VehicleDetailsForFormQuery($id: String!) {
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
export function useVehicleDetailsForFormQuery(baseOptions: Apollo.QueryHookOptions<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>(VehicleDetailsForFormQueryDocument, options);
      }
export function useVehicleDetailsForFormQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>(VehicleDetailsForFormQueryDocument, options);
        }
export type VehicleDetailsForFormQueryHookResult = ReturnType<typeof useVehicleDetailsForFormQuery>;
export type VehicleDetailsForFormQueryLazyQueryHookResult = ReturnType<typeof useVehicleDetailsForFormQueryLazyQuery>;
export type VehicleDetailsForFormQueryQueryResult = Apollo.QueryResult<VehicleDetailsForFormQuery, VehicleDetailsForFormQueryVariables>;