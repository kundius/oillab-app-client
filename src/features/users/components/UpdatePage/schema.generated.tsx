import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UsersUpdatePageFragment = { __typename?: 'User', id: number, name: string, email?: Types.Maybe<string>, role: Types.UserRole };

export type UsersUpdatePageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type UsersUpdatePageQuery = { __typename?: 'Query', user?: Types.Maybe<{ __typename?: 'User', id: number, name: string, email?: Types.Maybe<string>, role: Types.UserRole }> };

export type UsersUpdatePageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.UserUpdateInput;
}>;


export type UsersUpdatePageMutation = { __typename?: 'Mutation', userUpdate: { __typename?: 'UserUpdateResponse', success: boolean, error?: Types.Maybe<{ __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string }>, record?: Types.Maybe<{ __typename?: 'User', id: number, name: string, email?: Types.Maybe<string>, role: Types.UserRole }> } };

export const UsersUpdatePageFragmentDoc = gql`
    fragment UsersUpdatePageFragment on User {
  id
  name
  email
  role
}
    `;
export const UsersUpdatePageQueryDocument = gql`
    query UsersUpdatePageQuery($id: Int!) {
  user(id: $id) {
    ...UsersUpdatePageFragment
  }
}
    ${UsersUpdatePageFragmentDoc}`;

/**
 * __useUsersUpdatePageQuery__
 *
 * To run a query within a React component, call `useUsersUpdatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersUpdatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersUpdatePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUsersUpdatePageQuery(baseOptions: Apollo.QueryHookOptions<UsersUpdatePageQuery, UsersUpdatePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersUpdatePageQuery, UsersUpdatePageQueryVariables>(UsersUpdatePageQueryDocument, options);
      }
export function useUsersUpdatePageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersUpdatePageQuery, UsersUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersUpdatePageQuery, UsersUpdatePageQueryVariables>(UsersUpdatePageQueryDocument, options);
        }
export type UsersUpdatePageQueryHookResult = ReturnType<typeof useUsersUpdatePageQuery>;
export type UsersUpdatePageQueryLazyQueryHookResult = ReturnType<typeof useUsersUpdatePageQueryLazyQuery>;
export type UsersUpdatePageQueryQueryResult = Apollo.QueryResult<UsersUpdatePageQuery, UsersUpdatePageQueryVariables>;
export const UsersUpdatePageMutationDocument = gql`
    mutation UsersUpdatePageMutation($id: Int!, $input: UserUpdateInput!) {
  userUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...UsersUpdatePageFragment
    }
  }
}
    ${UsersUpdatePageFragmentDoc}`;
export type UsersUpdatePageMutationMutationFn = Apollo.MutationFunction<UsersUpdatePageMutation, UsersUpdatePageMutationVariables>;

/**
 * __useUsersUpdatePageMutation__
 *
 * To run a mutation, you first call `useUsersUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUsersUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [usersUpdatePageMutation, { data, loading, error }] = useUsersUpdatePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUsersUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<UsersUpdatePageMutation, UsersUpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UsersUpdatePageMutation, UsersUpdatePageMutationVariables>(UsersUpdatePageMutationDocument, options);
      }
export type UsersUpdatePageMutationHookResult = ReturnType<typeof useUsersUpdatePageMutation>;
export type UsersUpdatePageMutationMutationResult = Apollo.MutationResult<UsersUpdatePageMutation>;
export type UsersUpdatePageMutationMutationOptions = Apollo.BaseMutationOptions<UsersUpdatePageMutation, UsersUpdatePageMutationVariables>;