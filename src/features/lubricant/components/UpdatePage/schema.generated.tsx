import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LubricantUpdatePageFragment = { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity: string, productType?: Types.ProductType | null };

export type LubricantUpdatePageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type LubricantUpdatePageQuery = { __typename?: 'Query', lubricant?: { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity: string, productType?: Types.ProductType | null } | null };

export type LubricantUpdatePageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.LubricantUpdateInput;
}>;


export type LubricantUpdatePageMutation = { __typename?: 'Mutation', lubricantUpdate: { __typename?: 'LubricantUpdateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity: string, productType?: Types.ProductType | null } | null } };

export const LubricantUpdatePageFragmentDoc = gql`
    fragment LubricantUpdatePageFragment on Lubricant {
  id
  model
  brand
  viscosity
  productType
}
    `;
export const LubricantUpdatePageQueryDocument = gql`
    query LubricantUpdatePageQuery($id: Int!) {
  lubricant(id: $id) {
    ...LubricantUpdatePageFragment
  }
}
    ${LubricantUpdatePageFragmentDoc}`;

/**
 * __useLubricantUpdatePageQuery__
 *
 * To run a query within a React component, call `useLubricantUpdatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLubricantUpdatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLubricantUpdatePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLubricantUpdatePageQuery(baseOptions: Apollo.QueryHookOptions<LubricantUpdatePageQuery, LubricantUpdatePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LubricantUpdatePageQuery, LubricantUpdatePageQueryVariables>(LubricantUpdatePageQueryDocument, options);
      }
export function useLubricantUpdatePageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LubricantUpdatePageQuery, LubricantUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LubricantUpdatePageQuery, LubricantUpdatePageQueryVariables>(LubricantUpdatePageQueryDocument, options);
        }
export type LubricantUpdatePageQueryHookResult = ReturnType<typeof useLubricantUpdatePageQuery>;
export type LubricantUpdatePageQueryLazyQueryHookResult = ReturnType<typeof useLubricantUpdatePageQueryLazyQuery>;
export type LubricantUpdatePageQueryQueryResult = Apollo.QueryResult<LubricantUpdatePageQuery, LubricantUpdatePageQueryVariables>;
export const LubricantUpdatePageMutationDocument = gql`
    mutation LubricantUpdatePageMutation($id: Int!, $input: LubricantUpdateInput!) {
  lubricantUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...LubricantUpdatePageFragment
    }
  }
}
    ${LubricantUpdatePageFragmentDoc}`;
export type LubricantUpdatePageMutationMutationFn = Apollo.MutationFunction<LubricantUpdatePageMutation, LubricantUpdatePageMutationVariables>;

/**
 * __useLubricantUpdatePageMutation__
 *
 * To run a mutation, you first call `useLubricantUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLubricantUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lubricantUpdatePageMutation, { data, loading, error }] = useLubricantUpdatePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLubricantUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<LubricantUpdatePageMutation, LubricantUpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LubricantUpdatePageMutation, LubricantUpdatePageMutationVariables>(LubricantUpdatePageMutationDocument, options);
      }
export type LubricantUpdatePageMutationHookResult = ReturnType<typeof useLubricantUpdatePageMutation>;
export type LubricantUpdatePageMutationMutationResult = Apollo.MutationResult<LubricantUpdatePageMutation>;
export type LubricantUpdatePageMutationMutationOptions = Apollo.BaseMutationOptions<LubricantUpdatePageMutation, LubricantUpdatePageMutationVariables>;