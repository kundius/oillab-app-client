import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LubricantListPageItemFragment = { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity?: string | null };

export type LubricantListPageLubricantPaginateQueryVariables = Types.Exact<{
  sort?: Types.InputMaybe<Array<Types.LubricantSort> | Types.LubricantSort>;
  filter?: Types.InputMaybe<Types.LubricantFilter>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LubricantListPageLubricantPaginateQuery = { __typename?: 'Query', lubricantPaginate: { __typename?: 'LubricantPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity?: string | null }> } };

export const LubricantListPageItemFragmentDoc = gql`
    fragment LubricantListPageItem on Lubricant {
  id
  model
  brand
  viscosity
}
    `;
export const LubricantListPageLubricantPaginateDocument = gql`
    query LubricantListPageLubricantPaginate($sort: [LubricantSort!], $filter: LubricantFilter, $page: Int, $perPage: Int) {
  lubricantPaginate(sort: $sort, filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...LubricantListPageItem
    }
  }
}
    ${LubricantListPageItemFragmentDoc}`;

/**
 * __useLubricantListPageLubricantPaginateQuery__
 *
 * To run a query within a React component, call `useLubricantListPageLubricantPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useLubricantListPageLubricantPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLubricantListPageLubricantPaginateQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useLubricantListPageLubricantPaginateQuery(baseOptions?: Apollo.QueryHookOptions<LubricantListPageLubricantPaginateQuery, LubricantListPageLubricantPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LubricantListPageLubricantPaginateQuery, LubricantListPageLubricantPaginateQueryVariables>(LubricantListPageLubricantPaginateDocument, options);
      }
export function useLubricantListPageLubricantPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LubricantListPageLubricantPaginateQuery, LubricantListPageLubricantPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LubricantListPageLubricantPaginateQuery, LubricantListPageLubricantPaginateQueryVariables>(LubricantListPageLubricantPaginateDocument, options);
        }
export type LubricantListPageLubricantPaginateQueryHookResult = ReturnType<typeof useLubricantListPageLubricantPaginateQuery>;
export type LubricantListPageLubricantPaginateLazyQueryHookResult = ReturnType<typeof useLubricantListPageLubricantPaginateLazyQuery>;
export type LubricantListPageLubricantPaginateQueryResult = Apollo.QueryResult<LubricantListPageLubricantPaginateQuery, LubricantListPageLubricantPaginateQueryVariables>;