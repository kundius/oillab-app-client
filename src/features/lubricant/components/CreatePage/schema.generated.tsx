import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LubricantCreatePageMutationVariables = Types.Exact<{
  input: Types.LubricantCreateInput;
}>;


export type LubricantCreatePageMutation = { __typename?: 'Mutation', lubricantCreate: { __typename?: 'LubricantCreateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Lubricant', id: number } | null } };


export const LubricantCreatePageDocument = gql`
    mutation LubricantCreatePage($input: LubricantCreateInput!) {
  lubricantCreate(input: $input) {
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
export type LubricantCreatePageMutationFn = Apollo.MutationFunction<LubricantCreatePageMutation, LubricantCreatePageMutationVariables>;

/**
 * __useLubricantCreatePageMutation__
 *
 * To run a mutation, you first call `useLubricantCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLubricantCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lubricantCreatePageMutation, { data, loading, error }] = useLubricantCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLubricantCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<LubricantCreatePageMutation, LubricantCreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LubricantCreatePageMutation, LubricantCreatePageMutationVariables>(LubricantCreatePageDocument, options);
      }
export type LubricantCreatePageMutationHookResult = ReturnType<typeof useLubricantCreatePageMutation>;
export type LubricantCreatePageMutationResult = Apollo.MutationResult<LubricantCreatePageMutation>;
export type LubricantCreatePageMutationOptions = Apollo.BaseMutationOptions<LubricantCreatePageMutation, LubricantCreatePageMutationVariables>;