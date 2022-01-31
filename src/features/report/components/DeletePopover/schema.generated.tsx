import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ReportDeletePopoverMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type ReportDeletePopoverMutation = { __typename?: 'Mutation', reportDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: Types.Maybe<{ __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string }> } };


export const ReportDeletePopoverDocument = gql`
    mutation ReportDeletePopover($id: Int!) {
  reportDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type ReportDeletePopoverMutationFn = Apollo.MutationFunction<ReportDeletePopoverMutation, ReportDeletePopoverMutationVariables>;

/**
 * __useReportDeletePopoverMutation__
 *
 * To run a mutation, you first call `useReportDeletePopoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportDeletePopoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportDeletePopoverMutation, { data, loading, error }] = useReportDeletePopoverMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReportDeletePopoverMutation(baseOptions?: Apollo.MutationHookOptions<ReportDeletePopoverMutation, ReportDeletePopoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportDeletePopoverMutation, ReportDeletePopoverMutationVariables>(ReportDeletePopoverDocument, options);
      }
export type ReportDeletePopoverMutationHookResult = ReturnType<typeof useReportDeletePopoverMutation>;
export type ReportDeletePopoverMutationResult = Apollo.MutationResult<ReportDeletePopoverMutation>;
export type ReportDeletePopoverMutationOptions = Apollo.BaseMutationOptions<ReportDeletePopoverMutation, ReportDeletePopoverMutationVariables>;