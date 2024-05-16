import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AppHeaderCurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AppHeaderCurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, name: string, role: Types.UserRole } | null };


export const AppHeaderCurrentUserDocument = gql`
    query AppHeaderCurrentUser {
  currentUser {
    id
    name
    role
  }
}
    `;

/**
 * __useAppHeaderCurrentUserQuery__
 *
 * To run a query within a React component, call `useAppHeaderCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppHeaderCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppHeaderCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppHeaderCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<AppHeaderCurrentUserQuery, AppHeaderCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppHeaderCurrentUserQuery, AppHeaderCurrentUserQueryVariables>(AppHeaderCurrentUserDocument, options);
      }
export function useAppHeaderCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppHeaderCurrentUserQuery, AppHeaderCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppHeaderCurrentUserQuery, AppHeaderCurrentUserQueryVariables>(AppHeaderCurrentUserDocument, options);
        }
export function useAppHeaderCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AppHeaderCurrentUserQuery, AppHeaderCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AppHeaderCurrentUserQuery, AppHeaderCurrentUserQueryVariables>(AppHeaderCurrentUserDocument, options);
        }
export type AppHeaderCurrentUserQueryHookResult = ReturnType<typeof useAppHeaderCurrentUserQuery>;
export type AppHeaderCurrentUserLazyQueryHookResult = ReturnType<typeof useAppHeaderCurrentUserLazyQuery>;
export type AppHeaderCurrentUserSuspenseQueryHookResult = ReturnType<typeof useAppHeaderCurrentUserSuspenseQuery>;
export type AppHeaderCurrentUserQueryResult = Apollo.QueryResult<AppHeaderCurrentUserQuery, AppHeaderCurrentUserQueryVariables>;