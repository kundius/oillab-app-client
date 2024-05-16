import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResultDeletePopoverMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type ResultDeletePopoverMutation = { __typename?: 'Mutation', resultDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };


export const ResultDeletePopoverDocument = gql`
    mutation ResultDeletePopover($id: Int!) {
  resultDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type ResultDeletePopoverMutationFn = Apollo.MutationFunction<ResultDeletePopoverMutation, ResultDeletePopoverMutationVariables>;

/**
 * __useResultDeletePopoverMutation__
 *
 * To run a mutation, you first call `useResultDeletePopoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResultDeletePopoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resultDeletePopoverMutation, { data, loading, error }] = useResultDeletePopoverMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResultDeletePopoverMutation(baseOptions?: Apollo.MutationHookOptions<ResultDeletePopoverMutation, ResultDeletePopoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResultDeletePopoverMutation, ResultDeletePopoverMutationVariables>(ResultDeletePopoverDocument, options);
      }
export type ResultDeletePopoverMutationHookResult = ReturnType<typeof useResultDeletePopoverMutation>;
export type ResultDeletePopoverMutationResult = Apollo.MutationResult<ResultDeletePopoverMutation>;
export type ResultDeletePopoverMutationOptions = Apollo.BaseMutationOptions<ResultDeletePopoverMutation, ResultDeletePopoverMutationVariables>;