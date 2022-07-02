import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuthSignInPageMutationVariables = Types.Exact<{
  input: Types.SignInInput;
}>;


export type AuthSignInPageMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInResponse', success: boolean, token?: string | null, record?: { __typename?: 'User', id: number } | null, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', field: string, message: string } | null } };


export const AuthSignInPageDocument = gql`
    mutation AuthSignInPage($input: SignInInput!) {
  signIn(input: $input) {
    success
    token
    record {
      id
    }
    error {
      message
      ... on ValidationError {
        field
      }
    }
  }
}
    `;
export type AuthSignInPageMutationFn = Apollo.MutationFunction<AuthSignInPageMutation, AuthSignInPageMutationVariables>;

/**
 * __useAuthSignInPageMutation__
 *
 * To run a mutation, you first call `useAuthSignInPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignInPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignInPageMutation, { data, loading, error }] = useAuthSignInPageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthSignInPageMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignInPageMutation, AuthSignInPageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSignInPageMutation, AuthSignInPageMutationVariables>(AuthSignInPageDocument, options);
      }
export type AuthSignInPageMutationHookResult = ReturnType<typeof useAuthSignInPageMutation>;
export type AuthSignInPageMutationResult = Apollo.MutationResult<AuthSignInPageMutation>;
export type AuthSignInPageMutationOptions = Apollo.BaseMutationOptions<AuthSignInPageMutation, AuthSignInPageMutationVariables>;