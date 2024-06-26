import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VehicleUpdatePageFragment = { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string, liquidVolume?: string | null, owner: { __typename?: 'User', id: number, name: string } };

export type VehicleUpdatePageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type VehicleUpdatePageQuery = { __typename?: 'Query', vehicle?: { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string, liquidVolume?: string | null, owner: { __typename?: 'User', id: number, name: string } } | null };

export type VehicleUpdatePageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  input: Types.VehicleUpdateInput;
}>;


export type VehicleUpdatePageMutation = { __typename?: 'Mutation', vehicleUpdate: { __typename?: 'VehicleUpdateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string, liquidVolume?: string | null, owner: { __typename?: 'User', id: number, name: string } } | null } };

export const VehicleUpdatePageFragmentDoc = gql`
    fragment VehicleUpdatePageFragment on Vehicle {
  id
  model
  owner {
    id
    name
  }
  releaseYear
  stateNumber
  engineModel
  liquidVolume
}
    `;
export const VehicleUpdatePageQueryDocument = gql`
    query VehicleUpdatePageQuery($id: Int!) {
  vehicle(id: $id) {
    ...VehicleUpdatePageFragment
  }
}
    ${VehicleUpdatePageFragmentDoc}`;

/**
 * __useVehicleUpdatePageQuery__
 *
 * To run a query within a React component, call `useVehicleUpdatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleUpdatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleUpdatePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVehicleUpdatePageQuery(baseOptions: Apollo.QueryHookOptions<VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables> & ({ variables: VehicleUpdatePageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables>(VehicleUpdatePageQueryDocument, options);
      }
export function useVehicleUpdatePageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables>(VehicleUpdatePageQueryDocument, options);
        }
export function useVehicleUpdatePageQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables>(VehicleUpdatePageQueryDocument, options);
        }
export type VehicleUpdatePageQueryHookResult = ReturnType<typeof useVehicleUpdatePageQuery>;
export type VehicleUpdatePageQueryLazyQueryHookResult = ReturnType<typeof useVehicleUpdatePageQueryLazyQuery>;
export type VehicleUpdatePageQuerySuspenseQueryHookResult = ReturnType<typeof useVehicleUpdatePageQuerySuspenseQuery>;
export type VehicleUpdatePageQueryQueryResult = Apollo.QueryResult<VehicleUpdatePageQuery, VehicleUpdatePageQueryVariables>;
export const VehicleUpdatePageMutationDocument = gql`
    mutation VehicleUpdatePageMutation($id: Int!, $input: VehicleUpdateInput!) {
  vehicleUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...VehicleUpdatePageFragment
    }
  }
}
    ${VehicleUpdatePageFragmentDoc}`;
export type VehicleUpdatePageMutationMutationFn = Apollo.MutationFunction<VehicleUpdatePageMutation, VehicleUpdatePageMutationVariables>;

/**
 * __useVehicleUpdatePageMutation__
 *
 * To run a mutation, you first call `useVehicleUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleUpdatePageMutation, { data, loading, error }] = useVehicleUpdatePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVehicleUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<VehicleUpdatePageMutation, VehicleUpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VehicleUpdatePageMutation, VehicleUpdatePageMutationVariables>(VehicleUpdatePageMutationDocument, options);
      }
export type VehicleUpdatePageMutationHookResult = ReturnType<typeof useVehicleUpdatePageMutation>;
export type VehicleUpdatePageMutationMutationResult = Apollo.MutationResult<VehicleUpdatePageMutation>;
export type VehicleUpdatePageMutationMutationOptions = Apollo.BaseMutationOptions<VehicleUpdatePageMutation, VehicleUpdatePageMutationVariables>;