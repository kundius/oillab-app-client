import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Brand_Select_Fragment = { __typename?: 'Brand', id: number, name: string };

export type Brand_Select_QueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  page: Types.Scalars['Int']['input'];
  perPage: Types.Scalars['Int']['input'];
}>;


export type Brand_Select_Query = { __typename?: 'Query', brandPaginate: { __typename?: 'BrandPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Brand', id: number, name: string }> } };

export const Brand_Select_FragmentDoc = gql`
    fragment Brand_Select_Fragment on Brand {
  id
  name
}
    `;
export const Brand_Select_QueryDocument = gql`
    query Brand_Select_Query($search: String, $page: Int!, $perPage: Int!) {
  brandPaginate(
    filter: {name: {contains: $search}}
    page: $page
    perPage: $perPage
  ) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...Brand_Select_Fragment
    }
  }
}
    ${Brand_Select_FragmentDoc}`;

/**
 * __useBrand_Select_Query__
 *
 * To run a query within a React component, call `useBrand_Select_Query` and pass it any options that fit your needs.
 * When your component renders, `useBrand_Select_Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrand_Select_Query({
 *   variables: {
 *      search: // value for 'search'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useBrand_Select_Query(baseOptions: Apollo.QueryHookOptions<Brand_Select_Query, Brand_Select_QueryVariables> & ({ variables: Brand_Select_QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Brand_Select_Query, Brand_Select_QueryVariables>(Brand_Select_QueryDocument, options);
      }
export function useBrand_Select_QueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Brand_Select_Query, Brand_Select_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Brand_Select_Query, Brand_Select_QueryVariables>(Brand_Select_QueryDocument, options);
        }
export function useBrand_Select_QuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Brand_Select_Query, Brand_Select_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Brand_Select_Query, Brand_Select_QueryVariables>(Brand_Select_QueryDocument, options);
        }
export type Brand_Select_QueryHookResult = ReturnType<typeof useBrand_Select_Query>;
export type Brand_Select_QueryLazyQueryHookResult = ReturnType<typeof useBrand_Select_QueryLazyQuery>;
export type Brand_Select_QuerySuspenseQueryHookResult = ReturnType<typeof useBrand_Select_QuerySuspenseQuery>;
export type Brand_Select_QueryQueryResult = Apollo.QueryResult<Brand_Select_Query, Brand_Select_QueryVariables>;