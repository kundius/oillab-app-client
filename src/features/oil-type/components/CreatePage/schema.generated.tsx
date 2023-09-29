import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OilTypeCreatePageMutationVariables = Types.Exact<{
  input: Types.OilTypeCreateInput;
}>;


export type OilTypeCreatePageMutation = { __typename?: 'Mutation', oiltypeCreate: { __typename?: 'OilTypeCreateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'OilType', id: number } | null } };


export const OilTypeCreatePageDocument = gql`
    mutation OilTypeCreatePage($input: OilTypeCreateInput!) {
  oiltypeCreate(input: $input) {
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
export type OilTypeCreatePageMutationFn = Apollo.MutationFunction<OilTypeCreatePageMutation, OilTypeCreatePageMutationVariables>;

/**
 * __useOilTypeCreatePageMutation__
 *
 * To run a mutation, you first call `useOilTypeCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeCreatePageMutation, { data, loading, error }] = useOilTypeCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOilTypeCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeCreatePageMutation, OilTypeCreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeCreatePageMutation, OilTypeCreatePageMutationVariables>(OilTypeCreatePageDocument, options);
      }
export type OilTypeCreatePageMutationHookResult = ReturnType<typeof useOilTypeCreatePageMutation>;
export type OilTypeCreatePageMutationResult = Apollo.MutationResult<OilTypeCreatePageMutation>;
export type OilTypeCreatePageMutationOptions = Apollo.BaseMutationOptions<OilTypeCreatePageMutation, OilTypeCreatePageMutationVariables>;