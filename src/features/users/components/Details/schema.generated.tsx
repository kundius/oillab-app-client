import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersDetailsFragment = { __typename?: 'User', id: number, name: string, email: string, phone?: string | null, contactPerson?: string | null };

export type UsersDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type UsersDetailsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name: string, email: string, phone?: string | null, contactPerson?: string | null } | null };

export const UsersDetailsFragmentDoc = gql`
    fragment UsersDetailsFragment on User {
  id
  name
  email
  phone
  contactPerson
}
    `;
export const UsersDetailsQueryDocument = gql`
    query UsersDetailsQuery($id: Int!) {
  user(id: $id) {
    ...UsersDetailsFragment
  }
}
    ${UsersDetailsFragmentDoc}`;

/**
 * __useUsersDetailsQuery__
 *
 * To run a query within a React component, call `useUsersDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUsersDetailsQuery(baseOptions: Apollo.QueryHookOptions<UsersDetailsQuery, UsersDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersDetailsQuery, UsersDetailsQueryVariables>(UsersDetailsQueryDocument, options);
      }
export function useUsersDetailsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersDetailsQuery, UsersDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersDetailsQuery, UsersDetailsQueryVariables>(UsersDetailsQueryDocument, options);
        }
export type UsersDetailsQueryHookResult = ReturnType<typeof useUsersDetailsQuery>;
export type UsersDetailsQueryLazyQueryHookResult = ReturnType<typeof useUsersDetailsQueryLazyQuery>;
export type UsersDetailsQueryQueryResult = Apollo.QueryResult<UsersDetailsQuery, UsersDetailsQueryVariables>;