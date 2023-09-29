import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OilTypeDeletePopoverMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type OilTypeDeletePopoverMutation = { __typename?: 'Mutation', oiltypeDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };


export const OilTypeDeletePopoverDocument = gql`
    mutation OilTypeDeletePopover($id: Int!) {
  oiltypeDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type OilTypeDeletePopoverMutationFn = Apollo.MutationFunction<OilTypeDeletePopoverMutation, OilTypeDeletePopoverMutationVariables>;

/**
 * __useOilTypeDeletePopoverMutation__
 *
 * To run a mutation, you first call `useOilTypeDeletePopoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeDeletePopoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeDeletePopoverMutation, { data, loading, error }] = useOilTypeDeletePopoverMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOilTypeDeletePopoverMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeDeletePopoverMutation, OilTypeDeletePopoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeDeletePopoverMutation, OilTypeDeletePopoverMutationVariables>(OilTypeDeletePopoverDocument, options);
      }
export type OilTypeDeletePopoverMutationHookResult = ReturnType<typeof useOilTypeDeletePopoverMutation>;
export type OilTypeDeletePopoverMutationResult = Apollo.MutationResult<OilTypeDeletePopoverMutation>;
export type OilTypeDeletePopoverMutationOptions = Apollo.BaseMutationOptions<OilTypeDeletePopoverMutation, OilTypeDeletePopoverMutationVariables>;