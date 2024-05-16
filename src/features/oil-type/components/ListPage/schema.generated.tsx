import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OilTypeListPageItemFragment = { __typename?: 'OilType', id: number, name: string, standard: boolean };

export type OilTypeListPageOilTypePaginateQueryVariables = Types.Exact<{
  sort?: Types.InputMaybe<Array<Types.OilTypeSort> | Types.OilTypeSort>;
  filter?: Types.InputMaybe<Types.OilTypeFilter>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OilTypeListPageOilTypePaginateQuery = { __typename?: 'Query', oiltypePaginate: { __typename?: 'OilTypePaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'OilType', id: number, name: string, standard: boolean }> } };

export const OilTypeListPageItemFragmentDoc = gql`
    fragment OilTypeListPageItem on OilType {
  id
  name
  standard
}
    `;
export const OilTypeListPageOilTypePaginateDocument = gql`
    query OilTypeListPageOilTypePaginate($sort: [OilTypeSort!], $filter: OilTypeFilter, $page: Int, $perPage: Int) {
  oiltypePaginate(sort: $sort, filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...OilTypeListPageItem
    }
  }
}
    ${OilTypeListPageItemFragmentDoc}`;

/**
 * __useOilTypeListPageOilTypePaginateQuery__
 *
 * To run a query within a React component, call `useOilTypeListPageOilTypePaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useOilTypeListPageOilTypePaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOilTypeListPageOilTypePaginateQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useOilTypeListPageOilTypePaginateQuery(baseOptions?: Apollo.QueryHookOptions<OilTypeListPageOilTypePaginateQuery, OilTypeListPageOilTypePaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OilTypeListPageOilTypePaginateQuery, OilTypeListPageOilTypePaginateQueryVariables>(OilTypeListPageOilTypePaginateDocument, options);
      }
export function useOilTypeListPageOilTypePaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OilTypeListPageOilTypePaginateQuery, OilTypeListPageOilTypePaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OilTypeListPageOilTypePaginateQuery, OilTypeListPageOilTypePaginateQueryVariables>(OilTypeListPageOilTypePaginateDocument, options);
        }
export function useOilTypeListPageOilTypePaginateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OilTypeListPageOilTypePaginateQuery, OilTypeListPageOilTypePaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OilTypeListPageOilTypePaginateQuery, OilTypeListPageOilTypePaginateQueryVariables>(OilTypeListPageOilTypePaginateDocument, options);
        }
export type OilTypeListPageOilTypePaginateQueryHookResult = ReturnType<typeof useOilTypeListPageOilTypePaginateQuery>;
export type OilTypeListPageOilTypePaginateLazyQueryHookResult = ReturnType<typeof useOilTypeListPageOilTypePaginateLazyQuery>;
export type OilTypeListPageOilTypePaginateSuspenseQueryHookResult = ReturnType<typeof useOilTypeListPageOilTypePaginateSuspenseQuery>;
export type OilTypeListPageOilTypePaginateQueryResult = Apollo.QueryResult<OilTypeListPageOilTypePaginateQuery, OilTypeListPageOilTypePaginateQueryVariables>;