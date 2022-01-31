import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type VehicleCreatePageMutationVariables = Types.Exact<{
  input: Types.VehicleCreateInput;
}>;


export type VehicleCreatePageMutation = { __typename?: 'Mutation', vehicleCreate: { __typename?: 'VehicleCreateResponse', success: boolean, error?: Types.Maybe<{ __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string }>, record?: Types.Maybe<{ __typename?: 'Vehicle', id: number }> } };


export const VehicleCreatePageDocument = gql`
    mutation VehicleCreatePage($input: VehicleCreateInput!) {
  vehicleCreate(input: $input) {
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
export type VehicleCreatePageMutationFn = Apollo.MutationFunction<VehicleCreatePageMutation, VehicleCreatePageMutationVariables>;

/**
 * __useVehicleCreatePageMutation__
 *
 * To run a mutation, you first call `useVehicleCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleCreatePageMutation, { data, loading, error }] = useVehicleCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVehicleCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<VehicleCreatePageMutation, VehicleCreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VehicleCreatePageMutation, VehicleCreatePageMutationVariables>(VehicleCreatePageDocument, options);
      }
export type VehicleCreatePageMutationHookResult = ReturnType<typeof useVehicleCreatePageMutation>;
export type VehicleCreatePageMutationResult = Apollo.MutationResult<VehicleCreatePageMutation>;
export type VehicleCreatePageMutationOptions = Apollo.BaseMutationOptions<VehicleCreatePageMutation, VehicleCreatePageMutationVariables>;