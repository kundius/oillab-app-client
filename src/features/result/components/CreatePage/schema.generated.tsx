import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResultCreatePageMutationVariables = Types.Exact<{
  input: Types.ResultCreateInput;
}>;


export type ResultCreatePageMutation = { __typename?: 'Mutation', resultCreate: { __typename?: 'ResultCreateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Result', id: number } | null } };


export const ResultCreatePageDocument = gql`
    mutation ResultCreatePage($input: ResultCreateInput!) {
  resultCreate(input: $input) {
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
export type ResultCreatePageMutationFn = Apollo.MutationFunction<ResultCreatePageMutation, ResultCreatePageMutationVariables>;

/**
 * __useResultCreatePageMutation__
 *
 * To run a mutation, you first call `useResultCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResultCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resultCreatePageMutation, { data, loading, error }] = useResultCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResultCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<ResultCreatePageMutation, ResultCreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResultCreatePageMutation, ResultCreatePageMutationVariables>(ResultCreatePageDocument, options);
      }
export type ResultCreatePageMutationHookResult = ReturnType<typeof useResultCreatePageMutation>;
export type ResultCreatePageMutationResult = Apollo.MutationResult<ResultCreatePageMutation>;
export type ResultCreatePageMutationOptions = Apollo.BaseMutationOptions<ResultCreatePageMutation, ResultCreatePageMutationVariables>;