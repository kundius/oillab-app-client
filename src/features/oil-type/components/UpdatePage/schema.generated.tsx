import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OilTypeUpdatePageFragment = { __typename?: 'OilType', id: number, name: string, standard: boolean };

export type OilTypeUpdatePageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type OilTypeUpdatePageQuery = { __typename?: 'Query', oiltype?: { __typename?: 'OilType', id: number, name: string, standard: boolean } | null };

export type OilTypeUpdatePageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  input: Types.OilTypeUpdateInput;
}>;


export type OilTypeUpdatePageMutation = { __typename?: 'Mutation', oiltypeUpdate: { __typename?: 'OilTypeUpdateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'OilType', id: number, name: string, standard: boolean } | null } };

export const OilTypeUpdatePageFragmentDoc = gql`
    fragment OilTypeUpdatePageFragment on OilType {
  id
  name
  standard
}
    `;
export const OilTypeUpdatePageQueryDocument = gql`
    query OilTypeUpdatePageQuery($id: Int!) {
  oiltype(id: $id) {
    ...OilTypeUpdatePageFragment
  }
}
    ${OilTypeUpdatePageFragmentDoc}`;

/**
 * __useOilTypeUpdatePageQuery__
 *
 * To run a query within a React component, call `useOilTypeUpdatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useOilTypeUpdatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOilTypeUpdatePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOilTypeUpdatePageQuery(baseOptions: Apollo.QueryHookOptions<OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables> & ({ variables: OilTypeUpdatePageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables>(OilTypeUpdatePageQueryDocument, options);
      }
export function useOilTypeUpdatePageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables>(OilTypeUpdatePageQueryDocument, options);
        }
export function useOilTypeUpdatePageQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables>(OilTypeUpdatePageQueryDocument, options);
        }
export type OilTypeUpdatePageQueryHookResult = ReturnType<typeof useOilTypeUpdatePageQuery>;
export type OilTypeUpdatePageQueryLazyQueryHookResult = ReturnType<typeof useOilTypeUpdatePageQueryLazyQuery>;
export type OilTypeUpdatePageQuerySuspenseQueryHookResult = ReturnType<typeof useOilTypeUpdatePageQuerySuspenseQuery>;
export type OilTypeUpdatePageQueryQueryResult = Apollo.QueryResult<OilTypeUpdatePageQuery, OilTypeUpdatePageQueryVariables>;
export const OilTypeUpdatePageMutationDocument = gql`
    mutation OilTypeUpdatePageMutation($id: Int!, $input: OilTypeUpdateInput!) {
  oiltypeUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...OilTypeUpdatePageFragment
    }
  }
}
    ${OilTypeUpdatePageFragmentDoc}`;
export type OilTypeUpdatePageMutationMutationFn = Apollo.MutationFunction<OilTypeUpdatePageMutation, OilTypeUpdatePageMutationVariables>;

/**
 * __useOilTypeUpdatePageMutation__
 *
 * To run a mutation, you first call `useOilTypeUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeUpdatePageMutation, { data, loading, error }] = useOilTypeUpdatePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOilTypeUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeUpdatePageMutation, OilTypeUpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeUpdatePageMutation, OilTypeUpdatePageMutationVariables>(OilTypeUpdatePageMutationDocument, options);
      }
export type OilTypeUpdatePageMutationHookResult = ReturnType<typeof useOilTypeUpdatePageMutation>;
export type OilTypeUpdatePageMutationMutationResult = Apollo.MutationResult<OilTypeUpdatePageMutation>;
export type OilTypeUpdatePageMutationMutationOptions = Apollo.BaseMutationOptions<OilTypeUpdatePageMutation, OilTypeUpdatePageMutationVariables>;