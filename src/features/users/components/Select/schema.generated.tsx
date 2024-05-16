import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersSelectFragment = { __typename?: 'User', id: number, name: string };

export type UsersSelectQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  page: Types.Scalars['Int']['input'];
  perPage: Types.Scalars['Int']['input'];
}>;


export type UsersSelectQuery = { __typename?: 'Query', userPaginate: { __typename?: 'UserPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'User', id: number, name: string }> } };

export const UsersSelectFragmentDoc = gql`
    fragment UsersSelectFragment on User {
  id
  name
}
    `;
export const UsersSelectQueryDocument = gql`
    query UsersSelectQuery($search: String, $page: Int!, $perPage: Int!) {
  userPaginate(
    filter: {name: {contains: $search}}
    page: $page
    perPage: $perPage
  ) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...UsersSelectFragment
    }
  }
}
    ${UsersSelectFragmentDoc}`;

/**
 * __useUsersSelectQuery__
 *
 * To run a query within a React component, call `useUsersSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersSelectQuery({
 *   variables: {
 *      search: // value for 'search'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useUsersSelectQuery(baseOptions: Apollo.QueryHookOptions<UsersSelectQuery, UsersSelectQueryVariables> & ({ variables: UsersSelectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersSelectQuery, UsersSelectQueryVariables>(UsersSelectQueryDocument, options);
      }
export function useUsersSelectQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersSelectQuery, UsersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersSelectQuery, UsersSelectQueryVariables>(UsersSelectQueryDocument, options);
        }
export function useUsersSelectQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersSelectQuery, UsersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersSelectQuery, UsersSelectQueryVariables>(UsersSelectQueryDocument, options);
        }
export type UsersSelectQueryHookResult = ReturnType<typeof useUsersSelectQuery>;
export type UsersSelectQueryLazyQueryHookResult = ReturnType<typeof useUsersSelectQueryLazyQuery>;
export type UsersSelectQuerySuspenseQueryHookResult = ReturnType<typeof useUsersSelectQuerySuspenseQuery>;
export type UsersSelectQueryQueryResult = Apollo.QueryResult<UsersSelectQuery, UsersSelectQueryVariables>;