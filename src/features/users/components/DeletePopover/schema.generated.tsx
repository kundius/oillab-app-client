import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UsersDeletePopoverMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type UsersDeletePopoverMutation = { __typename?: 'Mutation', userDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: Types.Maybe<{ __typename?: 'NotFoundError', message: string } | { __typename?: 'PermissionDeniedError', message: string } | { __typename?: 'ValidationError', message: string }> } };


export const UsersDeletePopoverDocument = gql`
    mutation UsersDeletePopover($id: String!) {
  userDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type UsersDeletePopoverMutationFn = Apollo.MutationFunction<UsersDeletePopoverMutation, UsersDeletePopoverMutationVariables>;

/**
 * __useUsersDeletePopoverMutation__
 *
 * To run a mutation, you first call `useUsersDeletePopoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUsersDeletePopoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [usersDeletePopoverMutation, { data, loading, error }] = useUsersDeletePopoverMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUsersDeletePopoverMutation(baseOptions?: Apollo.MutationHookOptions<UsersDeletePopoverMutation, UsersDeletePopoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UsersDeletePopoverMutation, UsersDeletePopoverMutationVariables>(UsersDeletePopoverDocument, options);
      }
export type UsersDeletePopoverMutationHookResult = ReturnType<typeof useUsersDeletePopoverMutation>;
export type UsersDeletePopoverMutationResult = Apollo.MutationResult<UsersDeletePopoverMutation>;
export type UsersDeletePopoverMutationOptions = Apollo.BaseMutationOptions<UsersDeletePopoverMutation, UsersDeletePopoverMutationVariables>;