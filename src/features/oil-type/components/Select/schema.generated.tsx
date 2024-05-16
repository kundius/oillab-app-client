import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OilTypeSelectFragment = { __typename?: 'OilType', id: number, name: string };

export type OilTypeSelectQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input'];
  perPage: Types.Scalars['Int']['input'];
  filter?: Types.InputMaybe<Types.OilTypeFilter>;
}>;


export type OilTypeSelectQuery = { __typename?: 'Query', oiltypePaginate: { __typename?: 'OilTypePaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'OilType', id: number, name: string }> } };

export const OilTypeSelectFragmentDoc = gql`
    fragment OilTypeSelectFragment on OilType {
  id
  name
}
    `;
export const OilTypeSelectQueryDocument = gql`
    query OilTypeSelectQuery($page: Int!, $perPage: Int!, $filter: OilTypeFilter) {
  oiltypePaginate(filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...OilTypeSelectFragment
    }
  }
}
    ${OilTypeSelectFragmentDoc}`;

/**
 * __useOilTypeSelectQuery__
 *
 * To run a query within a React component, call `useOilTypeSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useOilTypeSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOilTypeSelectQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useOilTypeSelectQuery(baseOptions: Apollo.QueryHookOptions<OilTypeSelectQuery, OilTypeSelectQueryVariables> & ({ variables: OilTypeSelectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OilTypeSelectQuery, OilTypeSelectQueryVariables>(OilTypeSelectQueryDocument, options);
      }
export function useOilTypeSelectQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OilTypeSelectQuery, OilTypeSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OilTypeSelectQuery, OilTypeSelectQueryVariables>(OilTypeSelectQueryDocument, options);
        }
export function useOilTypeSelectQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OilTypeSelectQuery, OilTypeSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OilTypeSelectQuery, OilTypeSelectQueryVariables>(OilTypeSelectQueryDocument, options);
        }
export type OilTypeSelectQueryHookResult = ReturnType<typeof useOilTypeSelectQuery>;
export type OilTypeSelectQueryLazyQueryHookResult = ReturnType<typeof useOilTypeSelectQueryLazyQuery>;
export type OilTypeSelectQuerySuspenseQueryHookResult = ReturnType<typeof useOilTypeSelectQuerySuspenseQuery>;
export type OilTypeSelectQueryQueryResult = Apollo.QueryResult<OilTypeSelectQuery, OilTypeSelectQueryVariables>;