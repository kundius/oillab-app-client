import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReportSelectFragment = { __typename?: 'Report', id: number, formNumber?: string | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string } | null };

export type ReportSelectQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  page: Types.Scalars['Int']['input'];
  perPage: Types.Scalars['Int']['input'];
}>;


export type ReportSelectQuery = { __typename?: 'Query', reportPaginate: { __typename?: 'ReportPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Report', id: number, formNumber?: string | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string } | null }> } };

export const ReportSelectFragmentDoc = gql`
    fragment ReportSelectFragment on Report {
  id
  formNumber
  client {
    id
    name
  }
  vehicle {
    id
    model
  }
}
    `;
export const ReportSelectQueryDocument = gql`
    query ReportSelectQuery($search: String, $page: Int!, $perPage: Int!) {
  reportPaginate(
    filter: {formNumber: {contains: $search}}
    page: $page
    perPage: $perPage
  ) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...ReportSelectFragment
    }
  }
}
    ${ReportSelectFragmentDoc}`;

/**
 * __useReportSelectQuery__
 *
 * To run a query within a React component, call `useReportSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportSelectQuery({
 *   variables: {
 *      search: // value for 'search'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useReportSelectQuery(baseOptions: Apollo.QueryHookOptions<ReportSelectQuery, ReportSelectQueryVariables> & ({ variables: ReportSelectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportSelectQuery, ReportSelectQueryVariables>(ReportSelectQueryDocument, options);
      }
export function useReportSelectQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportSelectQuery, ReportSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportSelectQuery, ReportSelectQueryVariables>(ReportSelectQueryDocument, options);
        }
export function useReportSelectQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReportSelectQuery, ReportSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportSelectQuery, ReportSelectQueryVariables>(ReportSelectQueryDocument, options);
        }
export type ReportSelectQueryHookResult = ReturnType<typeof useReportSelectQuery>;
export type ReportSelectQueryLazyQueryHookResult = ReturnType<typeof useReportSelectQueryLazyQuery>;
export type ReportSelectQuerySuspenseQueryHookResult = ReturnType<typeof useReportSelectQuerySuspenseQuery>;
export type ReportSelectQueryQueryResult = Apollo.QueryResult<ReportSelectQuery, ReportSelectQueryVariables>;