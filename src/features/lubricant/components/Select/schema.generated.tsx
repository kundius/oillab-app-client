import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LubricantSelectFragment = { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity?: string | null };

export type LubricantSelectQueryVariables = Types.Exact<{
  page: Types.Scalars['Int'];
  perPage: Types.Scalars['Int'];
  filter?: Types.InputMaybe<Types.LubricantFilter>;
}>;


export type LubricantSelectQuery = { __typename?: 'Query', lubricantPaginate: { __typename?: 'LubricantPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity?: string | null }> } };

export const LubricantSelectFragmentDoc = gql`
    fragment LubricantSelectFragment on Lubricant {
  id
  model
  brand
  viscosity
}
    `;
export const LubricantSelectQueryDocument = gql`
    query LubricantSelectQuery($page: Int!, $perPage: Int!, $filter: LubricantFilter) {
  lubricantPaginate(filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...LubricantSelectFragment
    }
  }
}
    ${LubricantSelectFragmentDoc}`;

/**
 * __useLubricantSelectQuery__
 *
 * To run a query within a React component, call `useLubricantSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useLubricantSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLubricantSelectQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useLubricantSelectQuery(baseOptions: Apollo.QueryHookOptions<LubricantSelectQuery, LubricantSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LubricantSelectQuery, LubricantSelectQueryVariables>(LubricantSelectQueryDocument, options);
      }
export function useLubricantSelectQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LubricantSelectQuery, LubricantSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LubricantSelectQuery, LubricantSelectQueryVariables>(LubricantSelectQueryDocument, options);
        }
export type LubricantSelectQueryHookResult = ReturnType<typeof useLubricantSelectQuery>;
export type LubricantSelectQueryLazyQueryHookResult = ReturnType<typeof useLubricantSelectQueryLazyQuery>;
export type LubricantSelectQueryQueryResult = Apollo.QueryResult<LubricantSelectQuery, LubricantSelectQueryVariables>;