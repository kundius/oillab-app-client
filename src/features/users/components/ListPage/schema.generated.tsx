import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersListPageItemFragment = { __typename?: 'User', id: number, name: string, email: string, createdAt: any, lastActivityAt: any };

export type UsersListPageUserPaginateQueryVariables = Types.Exact<{
  sort?: Types.InputMaybe<Array<Types.UserSort> | Types.UserSort>;
  filter?: Types.InputMaybe<Types.UserFilter>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UsersListPageUserPaginateQuery = { __typename?: 'Query', userPaginate: { __typename?: 'UserPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'User', id: number, name: string, email: string, createdAt: any, lastActivityAt: any }> } };

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
    query UsersListPageUserPaginate($sort: [UserSort!], $filter: UserFilter, $page: Int, $perPage: Int) {
  userPaginate(sort: $sort, filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
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
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
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
export function useUsersListPageUserPaginateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersListPageUserPaginateQuery, UsersListPageUserPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersListPageUserPaginateQuery, UsersListPageUserPaginateQueryVariables>(UsersListPageUserPaginateDocument, options);
        }
export type UsersListPageUserPaginateQueryHookResult = ReturnType<typeof useUsersListPageUserPaginateQuery>;
export type UsersListPageUserPaginateLazyQueryHookResult = ReturnType<typeof useUsersListPageUserPaginateLazyQuery>;
export type UsersListPageUserPaginateSuspenseQueryHookResult = ReturnType<typeof useUsersListPageUserPaginateSuspenseQuery>;
export type UsersListPageUserPaginateQueryResult = Apollo.QueryResult<UsersListPageUserPaginateQuery, UsersListPageUserPaginateQueryVariables>;