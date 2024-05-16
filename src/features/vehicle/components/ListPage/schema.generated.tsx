import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VehicleListPageItemFragment = { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string, owner: { __typename?: 'User', id: number, name: string } };

export type VehicleListPageVehiclePaginateQueryVariables = Types.Exact<{
  sort?: Types.InputMaybe<Array<Types.VehicleSort> | Types.VehicleSort>;
  filter?: Types.InputMaybe<Types.VehicleFilter>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type VehicleListPageVehiclePaginateQuery = { __typename?: 'Query', vehiclePaginate: { __typename?: 'VehiclePaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string, owner: { __typename?: 'User', id: number, name: string } }> } };

export const VehicleListPageItemFragmentDoc = gql`
    fragment VehicleListPageItem on Vehicle {
  id
  model
  releaseYear
  stateNumber
  engineModel
  owner {
    id
    name
  }
}
    `;
export const VehicleListPageVehiclePaginateDocument = gql`
    query VehicleListPageVehiclePaginate($sort: [VehicleSort!], $filter: VehicleFilter, $page: Int, $perPage: Int) {
  vehiclePaginate(sort: $sort, filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...VehicleListPageItem
    }
  }
}
    ${VehicleListPageItemFragmentDoc}`;

/**
 * __useVehicleListPageVehiclePaginateQuery__
 *
 * To run a query within a React component, call `useVehicleListPageVehiclePaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleListPageVehiclePaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleListPageVehiclePaginateQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useVehicleListPageVehiclePaginateQuery(baseOptions?: Apollo.QueryHookOptions<VehicleListPageVehiclePaginateQuery, VehicleListPageVehiclePaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleListPageVehiclePaginateQuery, VehicleListPageVehiclePaginateQueryVariables>(VehicleListPageVehiclePaginateDocument, options);
      }
export function useVehicleListPageVehiclePaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleListPageVehiclePaginateQuery, VehicleListPageVehiclePaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleListPageVehiclePaginateQuery, VehicleListPageVehiclePaginateQueryVariables>(VehicleListPageVehiclePaginateDocument, options);
        }
export function useVehicleListPageVehiclePaginateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VehicleListPageVehiclePaginateQuery, VehicleListPageVehiclePaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VehicleListPageVehiclePaginateQuery, VehicleListPageVehiclePaginateQueryVariables>(VehicleListPageVehiclePaginateDocument, options);
        }
export type VehicleListPageVehiclePaginateQueryHookResult = ReturnType<typeof useVehicleListPageVehiclePaginateQuery>;
export type VehicleListPageVehiclePaginateLazyQueryHookResult = ReturnType<typeof useVehicleListPageVehiclePaginateLazyQuery>;
export type VehicleListPageVehiclePaginateSuspenseQueryHookResult = ReturnType<typeof useVehicleListPageVehiclePaginateSuspenseQuery>;
export type VehicleListPageVehiclePaginateQueryResult = Apollo.QueryResult<VehicleListPageVehiclePaginateQuery, VehicleListPageVehiclePaginateQueryVariables>;