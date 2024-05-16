import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LubricantDeletePopoverMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type LubricantDeletePopoverMutation = { __typename?: 'Mutation', lubricantDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };


export const LubricantDeletePopoverDocument = gql`
    mutation LubricantDeletePopover($id: Int!) {
  lubricantDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type LubricantDeletePopoverMutationFn = Apollo.MutationFunction<LubricantDeletePopoverMutation, LubricantDeletePopoverMutationVariables>;

/**
 * __useLubricantDeletePopoverMutation__
 *
 * To run a mutation, you first call `useLubricantDeletePopoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLubricantDeletePopoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lubricantDeletePopoverMutation, { data, loading, error }] = useLubricantDeletePopoverMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLubricantDeletePopoverMutation(baseOptions?: Apollo.MutationHookOptions<LubricantDeletePopoverMutation, LubricantDeletePopoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LubricantDeletePopoverMutation, LubricantDeletePopoverMutationVariables>(LubricantDeletePopoverDocument, options);
      }
export type LubricantDeletePopoverMutationHookResult = ReturnType<typeof useLubricantDeletePopoverMutation>;
export type LubricantDeletePopoverMutationResult = Apollo.MutationResult<LubricantDeletePopoverMutation>;
export type LubricantDeletePopoverMutationOptions = Apollo.BaseMutationOptions<LubricantDeletePopoverMutation, LubricantDeletePopoverMutationVariables>;