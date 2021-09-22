import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ReportCreatePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReportCreatePageQuery = { __typename?: 'Query', currentUser?: Types.Maybe<{ __typename?: 'User', id: string, role: Types.UserRole }> };

export type ReportCreatePageMutationVariables = Types.Exact<{
  input: Types.ReportCreateInput;
}>;


export type ReportCreatePageMutation = { __typename?: 'Mutation', reportCreate: { __typename?: 'ReportCreateResponse', success: boolean, error?: Types.Maybe<{ __typename?: 'NotFoundError', message: string } | { __typename?: 'PermissionDeniedError', message: string } | { __typename?: 'ValidationError', message: string }>, record?: Types.Maybe<{ __typename?: 'Report', id: string }> } };


export const ReportCreatePageQueryDocument = gql`
    query ReportCreatePageQuery {
  currentUser {
    id
    role
  }
}
    `;

/**
 * __useReportCreatePageQuery__
 *
 * To run a query within a React component, call `useReportCreatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportCreatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportCreatePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useReportCreatePageQuery(baseOptions?: Apollo.QueryHookOptions<ReportCreatePageQuery, ReportCreatePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportCreatePageQuery, ReportCreatePageQueryVariables>(ReportCreatePageQueryDocument, options);
      }
export function useReportCreatePageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportCreatePageQuery, ReportCreatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportCreatePageQuery, ReportCreatePageQueryVariables>(ReportCreatePageQueryDocument, options);
        }
export type ReportCreatePageQueryHookResult = ReturnType<typeof useReportCreatePageQuery>;
export type ReportCreatePageQueryLazyQueryHookResult = ReturnType<typeof useReportCreatePageQueryLazyQuery>;
export type ReportCreatePageQueryQueryResult = Apollo.QueryResult<ReportCreatePageQuery, ReportCreatePageQueryVariables>;
export const ReportCreatePageMutationDocument = gql`
    mutation ReportCreatePageMutation($input: ReportCreateInput!) {
  reportCreate(input: $input) {
    success
    error {
      message
    }
    record {
      id
    }
  }
}
    `;
export type ReportCreatePageMutationMutationFn = Apollo.MutationFunction<ReportCreatePageMutation, ReportCreatePageMutationVariables>;

/**
 * __useReportCreatePageMutation__
 *
 * To run a mutation, you first call `useReportCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportCreatePageMutation, { data, loading, error }] = useReportCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReportCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<ReportCreatePageMutation, ReportCreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportCreatePageMutation, ReportCreatePageMutationVariables>(ReportCreatePageMutationDocument, options);
      }
export type ReportCreatePageMutationHookResult = ReturnType<typeof useReportCreatePageMutation>;
export type ReportCreatePageMutationMutationResult = Apollo.MutationResult<ReportCreatePageMutation>;
export type ReportCreatePageMutationMutationOptions = Apollo.BaseMutationOptions<ReportCreatePageMutation, ReportCreatePageMutationVariables>;