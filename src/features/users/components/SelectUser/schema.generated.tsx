import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UsersSelectUserFragment = { __typename?: 'User', id: number, name: string };

export type UsersSelectUserQueryVariables = Types.Exact<{
  search?: Types.Maybe<Types.Scalars['String']>;
  page: Types.Scalars['Int'];
  perPage: Types.Scalars['Int'];
}>;


export type UsersSelectUserQuery = { __typename?: 'Query', userPaginate: { __typename?: 'UserPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'User', id: number, name: string }> } };

export const UsersSelectUserFragmentDoc = gql`
    fragment UsersSelectUserFragment on User {
  id
  name
}
    `;
export const UsersSelectUserQueryDocument = gql`
    query UsersSelectUserQuery($search: String, $page: Int!, $perPage: Int!) {
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
      ...UsersSelectUserFragment
    }
  }
}
    ${UsersSelectUserFragmentDoc}`;

/**
 * __useUsersSelectUserQuery__
 *
 * To run a query within a React component, call `useUsersSelectUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSelectUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersSelectUserQuery({
 *   variables: {
 *      search: // value for 'search'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useUsersSelectUserQuery(baseOptions: Apollo.QueryHookOptions<UsersSelectUserQuery, UsersSelectUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersSelectUserQuery, UsersSelectUserQueryVariables>(UsersSelectUserQueryDocument, options);
      }
export function useUsersSelectUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersSelectUserQuery, UsersSelectUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersSelectUserQuery, UsersSelectUserQueryVariables>(UsersSelectUserQueryDocument, options);
        }
export type UsersSelectUserQueryHookResult = ReturnType<typeof useUsersSelectUserQuery>;
export type UsersSelectUserQueryLazyQueryHookResult = ReturnType<typeof useUsersSelectUserQueryLazyQuery>;
export type UsersSelectUserQueryQueryResult = Apollo.QueryResult<UsersSelectUserQuery, UsersSelectUserQueryVariables>;