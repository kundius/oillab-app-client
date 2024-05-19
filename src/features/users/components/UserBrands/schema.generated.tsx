import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Users_UserBrands_Fragment = { __typename?: 'User', id: number, brands: Array<{ __typename?: 'Brand', id: number, name: string }> };

export type Users_UserBrands_QueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type Users_UserBrands_Query = { __typename?: 'Query', user?: { __typename?: 'User', id: number, brands: Array<{ __typename?: 'Brand', id: number, name: string }> } | null };

export type Users_UserBrands_AddMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  brandId: Types.Scalars['Int']['input'];
}>;


export type Users_UserBrands_AddMutation = { __typename?: 'Mutation', userAddBrand: { __typename?: 'UserAddBrandResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'User', id: number, brands: Array<{ __typename?: 'Brand', id: number, name: string }> } | null } };

export type Users_UserBrands_RemoveMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  brandId: Types.Scalars['Int']['input'];
}>;


export type Users_UserBrands_RemoveMutation = { __typename?: 'Mutation', userRemoveBrand: { __typename?: 'UserRemoveBrandResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'User', id: number, brands: Array<{ __typename?: 'Brand', id: number, name: string }> } | null } };

export const Users_UserBrands_FragmentDoc = gql`
    fragment Users_UserBrands_Fragment on User {
  id
  brands {
    id
    name
  }
}
    `;
export const Users_UserBrands_QueryDocument = gql`
    query Users_UserBrands_Query($id: Int!) {
  user(id: $id) {
    ...Users_UserBrands_Fragment
  }
}
    ${Users_UserBrands_FragmentDoc}`;

/**
 * __useUsers_UserBrands_Query__
 *
 * To run a query within a React component, call `useUsers_UserBrands_Query` and pass it any options that fit your needs.
 * When your component renders, `useUsers_UserBrands_Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsers_UserBrands_Query({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUsers_UserBrands_Query(baseOptions: Apollo.QueryHookOptions<Users_UserBrands_Query, Users_UserBrands_QueryVariables> & ({ variables: Users_UserBrands_QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Users_UserBrands_Query, Users_UserBrands_QueryVariables>(Users_UserBrands_QueryDocument, options);
      }
export function useUsers_UserBrands_QueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Users_UserBrands_Query, Users_UserBrands_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Users_UserBrands_Query, Users_UserBrands_QueryVariables>(Users_UserBrands_QueryDocument, options);
        }
export function useUsers_UserBrands_QuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Users_UserBrands_Query, Users_UserBrands_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Users_UserBrands_Query, Users_UserBrands_QueryVariables>(Users_UserBrands_QueryDocument, options);
        }
export type Users_UserBrands_QueryHookResult = ReturnType<typeof useUsers_UserBrands_Query>;
export type Users_UserBrands_QueryLazyQueryHookResult = ReturnType<typeof useUsers_UserBrands_QueryLazyQuery>;
export type Users_UserBrands_QuerySuspenseQueryHookResult = ReturnType<typeof useUsers_UserBrands_QuerySuspenseQuery>;
export type Users_UserBrands_QueryQueryResult = Apollo.QueryResult<Users_UserBrands_Query, Users_UserBrands_QueryVariables>;
export const Users_UserBrands_AddMutationDocument = gql`
    mutation Users_UserBrands_AddMutation($userId: Int!, $brandId: Int!) {
  userAddBrand(userId: $userId, brandId: $brandId) {
    success
    error {
      message
    }
    record {
      ...Users_UserBrands_Fragment
    }
  }
}
    ${Users_UserBrands_FragmentDoc}`;
export type Users_UserBrands_AddMutationMutationFn = Apollo.MutationFunction<Users_UserBrands_AddMutation, Users_UserBrands_AddMutationVariables>;

/**
 * __useUsers_UserBrands_AddMutation__
 *
 * To run a mutation, you first call `useUsers_UserBrands_AddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUsers_UserBrands_AddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [usersUserBrandsAddMutation, { data, loading, error }] = useUsers_UserBrands_AddMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      brandId: // value for 'brandId'
 *   },
 * });
 */
export function useUsers_UserBrands_AddMutation(baseOptions?: Apollo.MutationHookOptions<Users_UserBrands_AddMutation, Users_UserBrands_AddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Users_UserBrands_AddMutation, Users_UserBrands_AddMutationVariables>(Users_UserBrands_AddMutationDocument, options);
      }
export type Users_UserBrands_AddMutationHookResult = ReturnType<typeof useUsers_UserBrands_AddMutation>;
export type Users_UserBrands_AddMutationMutationResult = Apollo.MutationResult<Users_UserBrands_AddMutation>;
export type Users_UserBrands_AddMutationMutationOptions = Apollo.BaseMutationOptions<Users_UserBrands_AddMutation, Users_UserBrands_AddMutationVariables>;
export const Users_UserBrands_RemoveMutationDocument = gql`
    mutation Users_UserBrands_RemoveMutation($userId: Int!, $brandId: Int!) {
  userRemoveBrand(userId: $userId, brandId: $brandId) {
    success
    error {
      message
    }
    record {
      ...Users_UserBrands_Fragment
    }
  }
}
    ${Users_UserBrands_FragmentDoc}`;
export type Users_UserBrands_RemoveMutationMutationFn = Apollo.MutationFunction<Users_UserBrands_RemoveMutation, Users_UserBrands_RemoveMutationVariables>;

/**
 * __useUsers_UserBrands_RemoveMutation__
 *
 * To run a mutation, you first call `useUsers_UserBrands_RemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUsers_UserBrands_RemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [usersUserBrandsRemoveMutation, { data, loading, error }] = useUsers_UserBrands_RemoveMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      brandId: // value for 'brandId'
 *   },
 * });
 */
export function useUsers_UserBrands_RemoveMutation(baseOptions?: Apollo.MutationHookOptions<Users_UserBrands_RemoveMutation, Users_UserBrands_RemoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Users_UserBrands_RemoveMutation, Users_UserBrands_RemoveMutationVariables>(Users_UserBrands_RemoveMutationDocument, options);
      }
export type Users_UserBrands_RemoveMutationHookResult = ReturnType<typeof useUsers_UserBrands_RemoveMutation>;
export type Users_UserBrands_RemoveMutationMutationResult = Apollo.MutationResult<Users_UserBrands_RemoveMutation>;
export type Users_UserBrands_RemoveMutationMutationOptions = Apollo.BaseMutationOptions<Users_UserBrands_RemoveMutation, Users_UserBrands_RemoveMutationVariables>;