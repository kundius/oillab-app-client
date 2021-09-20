import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UsersListPageItemFragment = { __typename?: 'User', id: string, name: string, email?: Types.Maybe<string>, createdAt: any, lastActivityAt: any };

export type UsersListPageUserPaginateQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Array<Types.UserSort> | Types.UserSort>;
  filter?: Types.Maybe<Types.UserFilter>;
}>;


export type UsersListPageUserPaginateQuery = { __typename?: 'Query', userPaginate: { __typename?: 'UserPaginateResponse', items: Array<{ __typename?: 'User', id: string, name: string, email?: Types.Maybe<string>, createdAt: any, lastActivityAt: any }> } };

export const UsersListPageItemFragmentDoc = gql`
    fragment UsersListPageItem on User {
  id
  name
  email
  createdAt
  lastActivityAt
}
    `;
export const UsersListPageUserPaginateDocument = gql`
    query UsersListPageUserPaginate($sort: [UserSort!], $filter: UserFilter) {
  userPaginate(sort: $sort, filter: $filter) {
    items {
      ...UsersListPageItem
    }
  }
}
    ${UsersListPageItemFragmentDoc}`;

/**
 * __useUsersListPageUserPaginateQuery__
 *
 * To run a query within a React component, call `useUsersListPageUserPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersListPageUserPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersListPageUserPaginateQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUsersListPageUserPaginateQuery(baseOptions?: Apollo.QueryHookOptions<UsersListPageUserPaginateQuery, UsersListPageUserPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersListPageUserPaginateQuery, UsersListPageUserPaginateQueryVariables>(UsersListPageUserPaginateDocument, options);
      }
export function useUsersListPageUserPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersListPageUserPaginateQuery, UsersListPageUserPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersListPageUserPaginateQuery, UsersListPageUserPaginateQueryVariables>(UsersListPageUserPaginateDocument, options);
        }
export type UsersListPageUserPaginateQueryHookResult = ReturnType<typeof useUsersListPageUserPaginateQuery>;
export type UsersListPageUserPaginateLazyQueryHookResult = ReturnType<typeof useUsersListPageUserPaginateLazyQuery>;
export type UsersListPageUserPaginateQueryResult = Apollo.QueryResult<UsersListPageUserPaginateQuery, UsersListPageUserPaginateQueryVariables>;