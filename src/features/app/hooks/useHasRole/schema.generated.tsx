import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AppUseCurrentRoleQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AppUseCurrentRoleQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, role: Types.UserRole } | null };


export const AppUseCurrentRoleDocument = gql`
    query AppUseCurrentRole {
  currentUser {
    id
    role
  }
}
    `;

/**
 * __useAppUseCurrentRoleQuery__
 *
 * To run a query within a React component, call `useAppUseCurrentRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppUseCurrentRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppUseCurrentRoleQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppUseCurrentRoleQuery(baseOptions?: Apollo.QueryHookOptions<AppUseCurrentRoleQuery, AppUseCurrentRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppUseCurrentRoleQuery, AppUseCurrentRoleQueryVariables>(AppUseCurrentRoleDocument, options);
      }
export function useAppUseCurrentRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppUseCurrentRoleQuery, AppUseCurrentRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppUseCurrentRoleQuery, AppUseCurrentRoleQueryVariables>(AppUseCurrentRoleDocument, options);
        }
export function useAppUseCurrentRoleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AppUseCurrentRoleQuery, AppUseCurrentRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AppUseCurrentRoleQuery, AppUseCurrentRoleQueryVariables>(AppUseCurrentRoleDocument, options);
        }
export type AppUseCurrentRoleQueryHookResult = ReturnType<typeof useAppUseCurrentRoleQuery>;
export type AppUseCurrentRoleLazyQueryHookResult = ReturnType<typeof useAppUseCurrentRoleLazyQuery>;
export type AppUseCurrentRoleSuspenseQueryHookResult = ReturnType<typeof useAppUseCurrentRoleSuspenseQuery>;
export type AppUseCurrentRoleQueryResult = Apollo.QueryResult<AppUseCurrentRoleQuery, AppUseCurrentRoleQueryVariables>;