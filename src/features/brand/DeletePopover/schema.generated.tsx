import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Brand_DeletePopover_MutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type Brand_DeletePopover_Mutation = { __typename?: 'Mutation', brandDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };


export const Brand_DeletePopover_MutationDocument = gql`
    mutation Brand_DeletePopover_Mutation($id: Int!) {
  brandDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type Brand_DeletePopover_MutationMutationFn = Apollo.MutationFunction<Brand_DeletePopover_Mutation, Brand_DeletePopover_MutationVariables>;

/**
 * __useBrand_DeletePopover_Mutation__
 *
 * To run a mutation, you first call `useBrand_DeletePopover_Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBrand_DeletePopover_Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [brandDeletePopoverMutation, { data, loading, error }] = useBrand_DeletePopover_Mutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBrand_DeletePopover_Mutation(baseOptions?: Apollo.MutationHookOptions<Brand_DeletePopover_Mutation, Brand_DeletePopover_MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Brand_DeletePopover_Mutation, Brand_DeletePopover_MutationVariables>(Brand_DeletePopover_MutationDocument, options);
      }
export type Brand_DeletePopover_MutationHookResult = ReturnType<typeof useBrand_DeletePopover_Mutation>;
export type Brand_DeletePopover_MutationMutationResult = Apollo.MutationResult<Brand_DeletePopover_Mutation>;
export type Brand_DeletePopover_MutationMutationOptions = Apollo.BaseMutationOptions<Brand_DeletePopover_Mutation, Brand_DeletePopover_MutationVariables>;