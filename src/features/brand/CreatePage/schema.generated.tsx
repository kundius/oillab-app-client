import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Brand_CreatePage_MutationVariables = Types.Exact<{
  input: Types.BrandCreateInput;
}>;


export type Brand_CreatePage_Mutation = { __typename?: 'Mutation', brandCreate: { __typename?: 'BrandCreateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Brand', id: number } | null } };


export const Brand_CreatePage_MutationDocument = gql`
    mutation Brand_CreatePage_Mutation($input: BrandCreateInput!) {
  brandCreate(input: $input) {
    success
    error {
      message
    }
    record {
      id
    }
  }
}
    `;
export type Brand_CreatePage_MutationMutationFn = Apollo.MutationFunction<Brand_CreatePage_Mutation, Brand_CreatePage_MutationVariables>;

/**
 * __useBrand_CreatePage_Mutation__
 *
 * To run a mutation, you first call `useBrand_CreatePage_Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBrand_CreatePage_Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [brandCreatePageMutation, { data, loading, error }] = useBrand_CreatePage_Mutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBrand_CreatePage_Mutation(baseOptions?: Apollo.MutationHookOptions<Brand_CreatePage_Mutation, Brand_CreatePage_MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Brand_CreatePage_Mutation, Brand_CreatePage_MutationVariables>(Brand_CreatePage_MutationDocument, options);
      }
export type Brand_CreatePage_MutationHookResult = ReturnType<typeof useBrand_CreatePage_Mutation>;
export type Brand_CreatePage_MutationMutationResult = Apollo.MutationResult<Brand_CreatePage_Mutation>;
export type Brand_CreatePage_MutationMutationOptions = Apollo.BaseMutationOptions<Brand_CreatePage_Mutation, Brand_CreatePage_MutationVariables>;