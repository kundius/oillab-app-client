import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResultListPageItemFragment = { __typename?: 'Result', id: number, number: string, oilType: { __typename?: 'OilType', id: number, name: string } };

export type ResultListPageResultPaginateQueryVariables = Types.Exact<{
  sort?: Types.InputMaybe<Array<Types.ResultSort> | Types.ResultSort>;
  filter?: Types.InputMaybe<Types.ResultFilter>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ResultListPageResultPaginateQuery = { __typename?: 'Query', resultPaginate: { __typename?: 'ResultPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Result', id: number, number: string, oilType: { __typename?: 'OilType', id: number, name: string } }> } };

export const ResultListPageItemFragmentDoc = gql`
    fragment ResultListPageItem on Result {
  id
  number
  oilType {
    id
    name
  }
}
    `;
export const ResultListPageResultPaginateDocument = gql`
    query ResultListPageResultPaginate($sort: [ResultSort!], $filter: ResultFilter, $page: Int, $perPage: Int) {
  resultPaginate(sort: $sort, filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...ResultListPageItem
    }
  }
}
    ${ResultListPageItemFragmentDoc}`;

/**
 * __useResultListPageResultPaginateQuery__
 *
 * To run a query within a React component, call `useResultListPageResultPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useResultListPageResultPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResultListPageResultPaginateQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useResultListPageResultPaginateQuery(baseOptions?: Apollo.QueryHookOptions<ResultListPageResultPaginateQuery, ResultListPageResultPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResultListPageResultPaginateQuery, ResultListPageResultPaginateQueryVariables>(ResultListPageResultPaginateDocument, options);
      }
export function useResultListPageResultPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResultListPageResultPaginateQuery, ResultListPageResultPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResultListPageResultPaginateQuery, ResultListPageResultPaginateQueryVariables>(ResultListPageResultPaginateDocument, options);
        }
export type ResultListPageResultPaginateQueryHookResult = ReturnType<typeof useResultListPageResultPaginateQuery>;
export type ResultListPageResultPaginateLazyQueryHookResult = ReturnType<typeof useResultListPageResultPaginateLazyQuery>;
export type ResultListPageResultPaginateQueryResult = Apollo.QueryResult<ResultListPageResultPaginateQuery, ResultListPageResultPaginateQueryVariables>;