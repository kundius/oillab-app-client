import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AuthWithPageGuardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthWithPageGuardQuery = { __typename?: 'Query', currentUser?: Types.Maybe<{ __typename: 'User', id: string }> };


export const AuthWithPageGuardDocument = gql`
    query AuthWithPageGuard {
  currentUser {
    id
    __typename
  }
}
    `;

/**
 * __useAuthWithPageGuardQuery__
 *
 * To run a query within a React component, call `useAuthWithPageGuardQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthWithPageGuardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthWithPageGuardQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthWithPageGuardQuery(baseOptions?: Apollo.QueryHookOptions<AuthWithPageGuardQuery, AuthWithPageGuardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthWithPageGuardQuery, AuthWithPageGuardQueryVariables>(AuthWithPageGuardDocument, options);
      }
export function useAuthWithPageGuardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthWithPageGuardQuery, AuthWithPageGuardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthWithPageGuardQuery, AuthWithPageGuardQueryVariables>(AuthWithPageGuardDocument, options);
        }
export type AuthWithPageGuardQueryHookResult = ReturnType<typeof useAuthWithPageGuardQuery>;
export type AuthWithPageGuardLazyQueryHookResult = ReturnType<typeof useAuthWithPageGuardLazyQuery>;
export type AuthWithPageGuardQueryResult = Apollo.QueryResult<AuthWithPageGuardQuery, AuthWithPageGuardQueryVariables>;