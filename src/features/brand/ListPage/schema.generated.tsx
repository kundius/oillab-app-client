import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Brand_ListPage_Fragment = { __typename?: 'Brand', id: number, name: string };

export type Brand_ListPage_QueryVariables = Types.Exact<{
  sort?: Types.InputMaybe<Array<Types.BrandSort> | Types.BrandSort>;
  filter?: Types.InputMaybe<Types.BrandFilter>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type Brand_ListPage_Query = { __typename?: 'Query', brandPaginate: { __typename?: 'BrandPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Brand', id: number, name: string }> } };

export const Brand_ListPage_FragmentDoc = gql`
    fragment Brand_ListPage_Fragment on Brand {
  id
  name
}
    `;
export const Brand_ListPage_QueryDocument = gql`
    query Brand_ListPage_Query($sort: [BrandSort!], $filter: BrandFilter, $page: Int, $perPage: Int) {
  brandPaginate(sort: $sort, filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...Brand_ListPage_Fragment
    }
  }
}
    ${Brand_ListPage_FragmentDoc}`;

/**
 * __useBrand_ListPage_Query__
 *
 * To run a query within a React component, call `useBrand_ListPage_Query` and pass it any options that fit your needs.
 * When your component renders, `useBrand_ListPage_Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrand_ListPage_Query({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useBrand_ListPage_Query(baseOptions?: Apollo.QueryHookOptions<Brand_ListPage_Query, Brand_ListPage_QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Brand_ListPage_Query, Brand_ListPage_QueryVariables>(Brand_ListPage_QueryDocument, options);
      }
export function useBrand_ListPage_QueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Brand_ListPage_Query, Brand_ListPage_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Brand_ListPage_Query, Brand_ListPage_QueryVariables>(Brand_ListPage_QueryDocument, options);
        }
export function useBrand_ListPage_QuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Brand_ListPage_Query, Brand_ListPage_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Brand_ListPage_Query, Brand_ListPage_QueryVariables>(Brand_ListPage_QueryDocument, options);
        }
export type Brand_ListPage_QueryHookResult = ReturnType<typeof useBrand_ListPage_Query>;
export type Brand_ListPage_QueryLazyQueryHookResult = ReturnType<typeof useBrand_ListPage_QueryLazyQuery>;
export type Brand_ListPage_QuerySuspenseQueryHookResult = ReturnType<typeof useBrand_ListPage_QuerySuspenseQuery>;
export type Brand_ListPage_QueryQueryResult = Apollo.QueryResult<Brand_ListPage_Query, Brand_ListPage_QueryVariables>;