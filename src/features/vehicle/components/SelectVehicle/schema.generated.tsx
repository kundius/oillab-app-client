import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type VehicleSelectVehicleFragment = { __typename?: 'Vehicle', id: number, model: string, stateNumber: string };

export type VehicleSelectVehicleQueryVariables = Types.Exact<{
  page: Types.Scalars['Int'];
  perPage: Types.Scalars['Int'];
  filter?: Types.Maybe<Types.VehicleFilter>;
}>;


export type VehicleSelectVehicleQuery = { __typename?: 'Query', vehiclePaginate: { __typename?: 'VehiclePaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Vehicle', id: number, model: string, stateNumber: string }> } };

export const VehicleSelectVehicleFragmentDoc = gql`
    fragment VehicleSelectVehicleFragment on Vehicle {
  id
  model
  stateNumber
}
    `;
export const VehicleSelectVehicleQueryDocument = gql`
    query VehicleSelectVehicleQuery($page: Int!, $perPage: Int!, $filter: VehicleFilter) {
  vehiclePaginate(filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...VehicleSelectVehicleFragment
    }
  }
}
    ${VehicleSelectVehicleFragmentDoc}`;

/**
 * __useVehicleSelectVehicleQuery__
 *
 * To run a query within a React component, call `useVehicleSelectVehicleQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleSelectVehicleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleSelectVehicleQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useVehicleSelectVehicleQuery(baseOptions: Apollo.QueryHookOptions<VehicleSelectVehicleQuery, VehicleSelectVehicleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleSelectVehicleQuery, VehicleSelectVehicleQueryVariables>(VehicleSelectVehicleQueryDocument, options);
      }
export function useVehicleSelectVehicleQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleSelectVehicleQuery, VehicleSelectVehicleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleSelectVehicleQuery, VehicleSelectVehicleQueryVariables>(VehicleSelectVehicleQueryDocument, options);
        }
export type VehicleSelectVehicleQueryHookResult = ReturnType<typeof useVehicleSelectVehicleQuery>;
export type VehicleSelectVehicleQueryLazyQueryHookResult = ReturnType<typeof useVehicleSelectVehicleQueryLazyQuery>;
export type VehicleSelectVehicleQueryQueryResult = Apollo.QueryResult<VehicleSelectVehicleQuery, VehicleSelectVehicleQueryVariables>;