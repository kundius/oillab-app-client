import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ReportListPageItemFragment = { __typename?: 'Report', id: string, number: number, stateNumber: string, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, expressLaboratoryResult?: Types.Maybe<{ __typename?: 'File', id: string, name: string, url: string }>, laboratoryResult?: Types.Maybe<{ __typename?: 'File', id: string, name: string, url: string }>, client?: Types.Maybe<{ __typename?: 'User', id: string, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: string, model: string }> };

export type ReportListPageReportPaginateQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Array<Types.ReportSort> | Types.ReportSort>;
  filter?: Types.Maybe<Types.ReportFilter>;
}>;


export type ReportListPageReportPaginateQuery = { __typename?: 'Query', reportPaginate: { __typename?: 'ReportPaginateResponse', items: Array<{ __typename?: 'Report', id: string, number: number, stateNumber: string, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, expressLaboratoryResult?: Types.Maybe<{ __typename?: 'File', id: string, name: string, url: string }>, laboratoryResult?: Types.Maybe<{ __typename?: 'File', id: string, name: string, url: string }>, client?: Types.Maybe<{ __typename?: 'User', id: string, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: string, model: string }> }> } };

export const ReportListPageItemFragmentDoc = gql`
    fragment ReportListPageItem on Report {
  id
  number
  stateNumber
  totalMileage
  lubricantMileage
  samplingNodes
  note
  lubricant
  sampledAt
  expressLaboratoryResult {
    id
    name
    url
  }
  laboratoryResult {
    id
    name
    url
  }
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
export const ReportListPageReportPaginateDocument = gql`
    query ReportListPageReportPaginate($sort: [ReportSort!], $filter: ReportFilter) {
  reportPaginate(sort: $sort, filter: $filter) {
    items {
      ...ReportListPageItem
    }
  }
}
    ${ReportListPageItemFragmentDoc}`;

/**
 * __useReportListPageReportPaginateQuery__
 *
 * To run a query within a React component, call `useReportListPageReportPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportListPageReportPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportListPageReportPaginateQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useReportListPageReportPaginateQuery(baseOptions?: Apollo.QueryHookOptions<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>(ReportListPageReportPaginateDocument, options);
      }
export function useReportListPageReportPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>(ReportListPageReportPaginateDocument, options);
        }
export type ReportListPageReportPaginateQueryHookResult = ReturnType<typeof useReportListPageReportPaginateQuery>;
export type ReportListPageReportPaginateLazyQueryHookResult = ReturnType<typeof useReportListPageReportPaginateLazyQuery>;
export type ReportListPageReportPaginateQueryResult = Apollo.QueryResult<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>;