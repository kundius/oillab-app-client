import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Brand_UpdatePage_Fragment = { __typename?: 'Brand', id: number, name: string };

export type Brand_UpdatePage_QueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type Brand_UpdatePage_Query = { __typename?: 'Query', brand?: { __typename?: 'Brand', id: number, name: string } | null };

export type Brand_UpdatePage_MutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  input: Types.BrandUpdateInput;
}>;


export type Brand_UpdatePage_Mutation = { __typename?: 'Mutation', brandUpdate: { __typename?: 'BrandUpdateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Brand', id: number, name: string } | null } };

export const Brand_UpdatePage_FragmentDoc = gql`
    fragment Brand_UpdatePage_Fragment on Brand {
  id
  name
}
    `;
export const Brand_UpdatePage_QueryDocument = gql`
    query Brand_UpdatePage_Query($id: Int!) {
  brand(id: $id) {
    ...Brand_UpdatePage_Fragment
  }
}
    ${Brand_UpdatePage_FragmentDoc}`;

/**
 * __useBrand_UpdatePage_Query__
 *
 * To run a query within a React component, call `useBrand_UpdatePage_Query` and pass it any options that fit your needs.
 * When your component renders, `useBrand_UpdatePage_Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrand_UpdatePage_Query({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBrand_UpdatePage_Query(baseOptions: Apollo.QueryHookOptions<Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables> & ({ variables: Brand_UpdatePage_QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables>(Brand_UpdatePage_QueryDocument, options);
      }
export function useBrand_UpdatePage_QueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables>(Brand_UpdatePage_QueryDocument, options);
        }
export function useBrand_UpdatePage_QuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables>(Brand_UpdatePage_QueryDocument, options);
        }
export type Brand_UpdatePage_QueryHookResult = ReturnType<typeof useBrand_UpdatePage_Query>;
export type Brand_UpdatePage_QueryLazyQueryHookResult = ReturnType<typeof useBrand_UpdatePage_QueryLazyQuery>;
export type Brand_UpdatePage_QuerySuspenseQueryHookResult = ReturnType<typeof useBrand_UpdatePage_QuerySuspenseQuery>;
export type Brand_UpdatePage_QueryQueryResult = Apollo.QueryResult<Brand_UpdatePage_Query, Brand_UpdatePage_QueryVariables>;
export const Brand_UpdatePage_MutationDocument = gql`
    mutation Brand_UpdatePage_Mutation($id: Int!, $input: BrandUpdateInput!) {
  brandUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...Brand_UpdatePage_Fragment
    }
  }
}
    ${Brand_UpdatePage_FragmentDoc}`;
export type Brand_UpdatePage_MutationMutationFn = Apollo.MutationFunction<Brand_UpdatePage_Mutation, Brand_UpdatePage_MutationVariables>;

/**
 * __useBrand_UpdatePage_Mutation__
 *
 * To run a mutation, you first call `useBrand_UpdatePage_Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBrand_UpdatePage_Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [brandUpdatePageMutation, { data, loading, error }] = useBrand_UpdatePage_Mutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBrand_UpdatePage_Mutation(baseOptions?: Apollo.MutationHookOptions<Brand_UpdatePage_Mutation, Brand_UpdatePage_MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Brand_UpdatePage_Mutation, Brand_UpdatePage_MutationVariables>(Brand_UpdatePage_MutationDocument, options);
      }
export type Brand_UpdatePage_MutationHookResult = ReturnType<typeof useBrand_UpdatePage_Mutation>;
export type Brand_UpdatePage_MutationMutationResult = Apollo.MutationResult<Brand_UpdatePage_Mutation>;
export type Brand_UpdatePage_MutationMutationOptions = Apollo.BaseMutationOptions<Brand_UpdatePage_Mutation, Brand_UpdatePage_MutationVariables>;