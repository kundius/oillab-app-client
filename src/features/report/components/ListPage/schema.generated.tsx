import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ReportListPageItemFragment = { __typename?: 'Report', id: string, number: number, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, expressLaboratoryResult?: Types.Maybe<{ __typename?: 'File', id: string, name: string, url: string }>, laboratoryResult?: Types.Maybe<{ __typename?: 'File', id: string, name: string, url: string }>, client?: Types.Maybe<{ __typename?: 'User', id: string, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: string, model: string, releaseYear: string, stateNumber: string, engineModel: string }> };

export type ReportListPageReportPaginateQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Array<Types.ReportSort> | Types.ReportSort>;
  filter?: Types.Maybe<Types.ReportFilter>;
}>;


export type ReportListPageReportPaginateQuery = { __typename?: 'Query', reportPaginate: { __typename?: 'ReportPaginateResponse', items: Array<{ __typename?: 'Report', id: string, number: number, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, expressLaboratoryResult?: Types.Maybe<{ __typename?: 'File', id: string, name: string, url: string }>, laboratoryResult?: Types.Maybe<{ __typename?: 'File', id: string, name: string, url: string }>, client?: Types.Maybe<{ __typename?: 'User', id: string, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: string, model: string, releaseYear: string, stateNumber: string, engineModel: string }> }> } };

export type ReportListPageReportGeneratePdfMutationVariables = Types.Exact<{
  sort?: Types.Maybe<Array<Types.ReportSort> | Types.ReportSort>;
  filter?: Types.Maybe<Types.ReportFilter>;
}>;


export type ReportListPageReportGeneratePdfMutation = { __typename?: 'Mutation', reportGeneratePdf: { __typename?: 'ReportGeneratePdfResponse', success: boolean, error?: Types.Maybe<{ __typename?: 'NotFoundError', message: string } | { __typename?: 'PermissionDeniedError', message: string } | { __typename?: 'ValidationError', message: string }>, record?: Types.Maybe<{ __typename?: 'File', id: string, url: string }> } };

export const ReportListPageItemFragmentDoc = gql`
    fragment ReportListPageItem on Report {
  id
  number
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
    releaseYear
    stateNumber
    engineModel
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
export const ReportListPageReportGeneratePdfDocument = gql`
    mutation ReportListPageReportGeneratePdf($sort: [ReportSort!], $filter: ReportFilter) {
  reportGeneratePdf(sort: $sort, filter: $filter) {
    success
    error {
      message
    }
    record {
      id
      url
    }
  }
}
    `;
export type ReportListPageReportGeneratePdfMutationFn = Apollo.MutationFunction<ReportListPageReportGeneratePdfMutation, ReportListPageReportGeneratePdfMutationVariables>;

/**
 * __useReportListPageReportGeneratePdfMutation__
 *
 * To run a mutation, you first call `useReportListPageReportGeneratePdfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportListPageReportGeneratePdfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportListPageReportGeneratePdfMutation, { data, loading, error }] = useReportListPageReportGeneratePdfMutation({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useReportListPageReportGeneratePdfMutation(baseOptions?: Apollo.MutationHookOptions<ReportListPageReportGeneratePdfMutation, ReportListPageReportGeneratePdfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportListPageReportGeneratePdfMutation, ReportListPageReportGeneratePdfMutationVariables>(ReportListPageReportGeneratePdfDocument, options);
      }
export type ReportListPageReportGeneratePdfMutationHookResult = ReturnType<typeof useReportListPageReportGeneratePdfMutation>;
export type ReportListPageReportGeneratePdfMutationResult = Apollo.MutationResult<ReportListPageReportGeneratePdfMutation>;
export type ReportListPageReportGeneratePdfMutationOptions = Apollo.BaseMutationOptions<ReportListPageReportGeneratePdfMutation, ReportListPageReportGeneratePdfMutationVariables>;