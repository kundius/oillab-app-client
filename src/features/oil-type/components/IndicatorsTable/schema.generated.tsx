import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OilTypeIndicatorsTableItemFragment = { __typename?: 'OilTypeIndicator', id: number, name: string, ntd: string, units: string, oilType: { __typename?: 'OilType', id: number } };

export type OilTypeIndicatorsTableListQueryVariables = Types.Exact<{
  oilTypeId: Types.Scalars['Int'];
}>;


export type OilTypeIndicatorsTableListQuery = { __typename?: 'Query', oilTypeIndicatorList: { __typename?: 'OilTypeIndicatorListResponse', items: Array<{ __typename?: 'OilTypeIndicator', id: number, name: string, ntd: string, units: string, oilType: { __typename?: 'OilType', id: number } }> } };

export type OilTypeIndicatorsTableCreateMutationVariables = Types.Exact<{
  oilTypeId: Types.Scalars['Int'];
  input: Types.OilTypeIndicatorCreateInput;
}>;


export type OilTypeIndicatorsTableCreateMutation = { __typename?: 'Mutation', oilTypeIndicatorCreate: { __typename?: 'OilTypeIndicatorCreateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'OilTypeIndicator', id: number, name: string, ntd: string, units: string, oilType: { __typename?: 'OilType', id: number } } | null } };

export type OilTypeIndicatorsTableUpdateMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.OilTypeIndicatorUpdateInput;
}>;


export type OilTypeIndicatorsTableUpdateMutation = { __typename?: 'Mutation', oilTypeIndicatorUpdate: { __typename?: 'OilTypeIndicatorUpdateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'OilTypeIndicator', id: number, name: string, ntd: string, units: string, oilType: { __typename?: 'OilType', id: number } } | null } };

export type OilTypeIndicatorsTableDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type OilTypeIndicatorsTableDeleteMutation = { __typename?: 'Mutation', oilTypeIndicatorDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };

export const OilTypeIndicatorsTableItemFragmentDoc = gql`
    fragment OilTypeIndicatorsTableItem on OilTypeIndicator {
  id
  name
  ntd
  units
  oilType {
    id
  }
}
    `;
export const OilTypeIndicatorsTableListDocument = gql`
    query OilTypeIndicatorsTableList($oilTypeId: Int!) {
  oilTypeIndicatorList(oilTypeId: $oilTypeId) {
    items {
      ...OilTypeIndicatorsTableItem
    }
  }
}
    ${OilTypeIndicatorsTableItemFragmentDoc}`;

/**
 * __useOilTypeIndicatorsTableListQuery__
 *
 * To run a query within a React component, call `useOilTypeIndicatorsTableListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOilTypeIndicatorsTableListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOilTypeIndicatorsTableListQuery({
 *   variables: {
 *      oilTypeId: // value for 'oilTypeId'
 *   },
 * });
 */
export function useOilTypeIndicatorsTableListQuery(baseOptions: Apollo.QueryHookOptions<OilTypeIndicatorsTableListQuery, OilTypeIndicatorsTableListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OilTypeIndicatorsTableListQuery, OilTypeIndicatorsTableListQueryVariables>(OilTypeIndicatorsTableListDocument, options);
      }
export function useOilTypeIndicatorsTableListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OilTypeIndicatorsTableListQuery, OilTypeIndicatorsTableListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OilTypeIndicatorsTableListQuery, OilTypeIndicatorsTableListQueryVariables>(OilTypeIndicatorsTableListDocument, options);
        }
export type OilTypeIndicatorsTableListQueryHookResult = ReturnType<typeof useOilTypeIndicatorsTableListQuery>;
export type OilTypeIndicatorsTableListLazyQueryHookResult = ReturnType<typeof useOilTypeIndicatorsTableListLazyQuery>;
export type OilTypeIndicatorsTableListQueryResult = Apollo.QueryResult<OilTypeIndicatorsTableListQuery, OilTypeIndicatorsTableListQueryVariables>;
export const OilTypeIndicatorsTableCreateDocument = gql`
    mutation OilTypeIndicatorsTableCreate($oilTypeId: Int!, $input: OilTypeIndicatorCreateInput!) {
  oilTypeIndicatorCreate(oilTypeId: $oilTypeId, input: $input) {
    success
    error {
      message
    }
    record {
      ...OilTypeIndicatorsTableItem
    }
  }
}
    ${OilTypeIndicatorsTableItemFragmentDoc}`;
export type OilTypeIndicatorsTableCreateMutationFn = Apollo.MutationFunction<OilTypeIndicatorsTableCreateMutation, OilTypeIndicatorsTableCreateMutationVariables>;

/**
 * __useOilTypeIndicatorsTableCreateMutation__
 *
 * To run a mutation, you first call `useOilTypeIndicatorsTableCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeIndicatorsTableCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeIndicatorsTableCreateMutation, { data, loading, error }] = useOilTypeIndicatorsTableCreateMutation({
 *   variables: {
 *      oilTypeId: // value for 'oilTypeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOilTypeIndicatorsTableCreateMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeIndicatorsTableCreateMutation, OilTypeIndicatorsTableCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeIndicatorsTableCreateMutation, OilTypeIndicatorsTableCreateMutationVariables>(OilTypeIndicatorsTableCreateDocument, options);
      }
export type OilTypeIndicatorsTableCreateMutationHookResult = ReturnType<typeof useOilTypeIndicatorsTableCreateMutation>;
export type OilTypeIndicatorsTableCreateMutationResult = Apollo.MutationResult<OilTypeIndicatorsTableCreateMutation>;
export type OilTypeIndicatorsTableCreateMutationOptions = Apollo.BaseMutationOptions<OilTypeIndicatorsTableCreateMutation, OilTypeIndicatorsTableCreateMutationVariables>;
export const OilTypeIndicatorsTableUpdateDocument = gql`
    mutation OilTypeIndicatorsTableUpdate($id: Int!, $input: OilTypeIndicatorUpdateInput!) {
  oilTypeIndicatorUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...OilTypeIndicatorsTableItem
    }
  }
}
    ${OilTypeIndicatorsTableItemFragmentDoc}`;
export type OilTypeIndicatorsTableUpdateMutationFn = Apollo.MutationFunction<OilTypeIndicatorsTableUpdateMutation, OilTypeIndicatorsTableUpdateMutationVariables>;

/**
 * __useOilTypeIndicatorsTableUpdateMutation__
 *
 * To run a mutation, you first call `useOilTypeIndicatorsTableUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeIndicatorsTableUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeIndicatorsTableUpdateMutation, { data, loading, error }] = useOilTypeIndicatorsTableUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOilTypeIndicatorsTableUpdateMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeIndicatorsTableUpdateMutation, OilTypeIndicatorsTableUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeIndicatorsTableUpdateMutation, OilTypeIndicatorsTableUpdateMutationVariables>(OilTypeIndicatorsTableUpdateDocument, options);
      }
export type OilTypeIndicatorsTableUpdateMutationHookResult = ReturnType<typeof useOilTypeIndicatorsTableUpdateMutation>;
export type OilTypeIndicatorsTableUpdateMutationResult = Apollo.MutationResult<OilTypeIndicatorsTableUpdateMutation>;
export type OilTypeIndicatorsTableUpdateMutationOptions = Apollo.BaseMutationOptions<OilTypeIndicatorsTableUpdateMutation, OilTypeIndicatorsTableUpdateMutationVariables>;
export const OilTypeIndicatorsTableDeleteDocument = gql`
    mutation OilTypeIndicatorsTableDelete($id: Int!) {
  oilTypeIndicatorDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type OilTypeIndicatorsTableDeleteMutationFn = Apollo.MutationFunction<OilTypeIndicatorsTableDeleteMutation, OilTypeIndicatorsTableDeleteMutationVariables>;

/**
 * __useOilTypeIndicatorsTableDeleteMutation__
 *
 * To run a mutation, you first call `useOilTypeIndicatorsTableDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeIndicatorsTableDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeIndicatorsTableDeleteMutation, { data, loading, error }] = useOilTypeIndicatorsTableDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOilTypeIndicatorsTableDeleteMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeIndicatorsTableDeleteMutation, OilTypeIndicatorsTableDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeIndicatorsTableDeleteMutation, OilTypeIndicatorsTableDeleteMutationVariables>(OilTypeIndicatorsTableDeleteDocument, options);
      }
export type OilTypeIndicatorsTableDeleteMutationHookResult = ReturnType<typeof useOilTypeIndicatorsTableDeleteMutation>;
export type OilTypeIndicatorsTableDeleteMutationResult = Apollo.MutationResult<OilTypeIndicatorsTableDeleteMutation>;
export type OilTypeIndicatorsTableDeleteMutationOptions = Apollo.BaseMutationOptions<OilTypeIndicatorsTableDeleteMutation, OilTypeIndicatorsTableDeleteMutationVariables>;