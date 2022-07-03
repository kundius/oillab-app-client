import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LubricantDetailsFragment = { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity?: string | null };

export type LubricantDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type LubricantDetailsQuery = { __typename?: 'Query', lubricant?: { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity?: string | null } | null };

export const LubricantDetailsFragmentDoc = gql`
    fragment LubricantDetailsFragment on Lubricant {
  id
  model
  brand
  viscosity
}
    `;
export const LubricantDetailsQueryDocument = gql`
    query LubricantDetailsQuery($id: Int!) {
  lubricant(id: $id) {
    ...LubricantDetailsFragment
  }
}
    ${LubricantDetailsFragmentDoc}`;

/**
 * __useLubricantDetailsQuery__
 *
 * To run a query within a React component, call `useLubricantDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLubricantDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLubricantDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLubricantDetailsQuery(baseOptions: Apollo.QueryHookOptions<LubricantDetailsQuery, LubricantDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LubricantDetailsQuery, LubricantDetailsQueryVariables>(LubricantDetailsQueryDocument, options);
      }
export function useLubricantDetailsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LubricantDetailsQuery, LubricantDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LubricantDetailsQuery, LubricantDetailsQueryVariables>(LubricantDetailsQueryDocument, options);
        }
export type LubricantDetailsQueryHookResult = ReturnType<typeof useLubricantDetailsQuery>;
export type LubricantDetailsQueryLazyQueryHookResult = ReturnType<typeof useLubricantDetailsQueryLazyQuery>;
export type LubricantDetailsQueryQueryResult = Apollo.QueryResult<LubricantDetailsQuery, LubricantDetailsQueryVariables>;