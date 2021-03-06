import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersCreatePageMutationVariables = Types.Exact<{
  input: Types.UserCreateInput;
}>;


export type UsersCreatePageMutation = { __typename?: 'Mutation', userCreate: { __typename?: 'UserCreateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'User', id: number, name: string, email: string, role: Types.UserRole } | null } };


export const UsersCreatePageDocument = gql`
    mutation UsersCreatePage($input: UserCreateInput!) {
  userCreate(input: $input) {
    success
    error {
      message
    }
    record {
      id
      name
      email
      role
    }
  }
}
    `;
export type UsersCreatePageMutationFn = Apollo.MutationFunction<UsersCreatePageMutation, UsersCreatePageMutationVariables>;

/**
 * __useUsersCreatePageMutation__
 *
 * To run a mutation, you first call `useUsersCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUsersCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [usersCreatePageMutation, { data, loading, error }] = useUsersCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUsersCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<UsersCreatePageMutation, UsersCreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UsersCreatePageMutation, UsersCreatePageMutationVariables>(UsersCreatePageDocument, options);
      }
export type UsersCreatePageMutationHookResult = ReturnType<typeof useUsersCreatePageMutation>;
export type UsersCreatePageMutationResult = Apollo.MutationResult<UsersCreatePageMutation>;
export type UsersCreatePageMutationOptions = Apollo.BaseMutationOptions<UsersCreatePageMutation, UsersCreatePageMutationVariables>;