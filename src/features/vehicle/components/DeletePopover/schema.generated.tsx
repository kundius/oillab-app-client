import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VehicleDeletePopoverMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type VehicleDeletePopoverMutation = { __typename?: 'Mutation', vehicleDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };


export const VehicleDeletePopoverDocument = gql`
    mutation VehicleDeletePopover($id: Int!) {
  vehicleDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type VehicleDeletePopoverMutationFn = Apollo.MutationFunction<VehicleDeletePopoverMutation, VehicleDeletePopoverMutationVariables>;

/**
 * __useVehicleDeletePopoverMutation__
 *
 * To run a mutation, you first call `useVehicleDeletePopoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleDeletePopoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleDeletePopoverMutation, { data, loading, error }] = useVehicleDeletePopoverMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVehicleDeletePopoverMutation(baseOptions?: Apollo.MutationHookOptions<VehicleDeletePopoverMutation, VehicleDeletePopoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VehicleDeletePopoverMutation, VehicleDeletePopoverMutationVariables>(VehicleDeletePopoverDocument, options);
      }
export type VehicleDeletePopoverMutationHookResult = ReturnType<typeof useVehicleDeletePopoverMutation>;
export type VehicleDeletePopoverMutationResult = Apollo.MutationResult<VehicleDeletePopoverMutation>;
export type VehicleDeletePopoverMutationOptions = Apollo.BaseMutationOptions<VehicleDeletePopoverMutation, VehicleDeletePopoverMutationVariables>;