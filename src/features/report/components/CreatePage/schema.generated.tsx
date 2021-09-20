import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ReportCreatePageMutationVariables = Types.Exact<{
  input: Types.ReportCreateInput;
}>;


export type ReportCreatePageMutation = { __typename?: 'Mutation', reportCreate: { __typename?: 'ReportCreateResponse', success: boolean, error?: Types.Maybe<{ __typename?: 'NotFoundError', message: string }>, record?: Types.Maybe<{ __typename?: 'Report', id: string }> } };


export const ReportCreatePageDocument = gql`
    mutation ReportCreatePage($input: ReportCreateInput!) {
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
export type ReportCreatePageMutationFn = Apollo.MutationFunction<ReportCreatePageMutation, ReportCreatePageMutationVariables>;

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
        return Apollo.useMutation<ReportCreatePageMutation, ReportCreatePageMutationVariables>(ReportCreatePageDocument, options);
      }
export type ReportCreatePageMutationHookResult = ReturnType<typeof useReportCreatePageMutation>;
export type ReportCreatePageMutationResult = Apollo.MutationResult<ReportCreatePageMutation>;
export type ReportCreatePageMutationOptions = Apollo.BaseMutationOptions<ReportCreatePageMutation, ReportCreatePageMutationVariables>;