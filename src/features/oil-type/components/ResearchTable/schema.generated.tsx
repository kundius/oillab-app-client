import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OilTypeResearchTableItemFragment = { __typename?: 'OilTypeResearch', id: number, name: string };

export type OilTypeResearchTableListQueryVariables = Types.Exact<{
  oilTypeId: Types.Scalars['Int'];
}>;


export type OilTypeResearchTableListQuery = { __typename?: 'Query', oilTypeResearchList: { __typename?: 'OilTypeResearchListResponse', items: Array<{ __typename?: 'OilTypeResearch', id: number, name: string }> } };

export type OilTypeResearchTableCreateMutationVariables = Types.Exact<{
  oilTypeId: Types.Scalars['Int'];
  input: Types.OilTypeResearchCreateInput;
}>;


export type OilTypeResearchTableCreateMutation = { __typename?: 'Mutation', oilTypeResearchCreate: { __typename?: 'OilTypeResearchCreateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'OilTypeResearch', id: number, name: string } | null } };

export type OilTypeResearchTableUpdateMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.OilTypeResearchUpdateInput;
}>;


export type OilTypeResearchTableUpdateMutation = { __typename?: 'Mutation', oilTypeResearchUpdate: { __typename?: 'OilTypeResearchUpdateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'OilTypeResearch', id: number, name: string } | null } };

export type OilTypeResearchTableDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type OilTypeResearchTableDeleteMutation = { __typename?: 'Mutation', oilTypeResearchDelete: { __typename?: 'DefaultMutationResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };

export const OilTypeResearchTableItemFragmentDoc = gql`
    fragment OilTypeResearchTableItem on OilTypeResearch {
  id
  name
}
    `;
export const OilTypeResearchTableListDocument = gql`
    query OilTypeResearchTableList($oilTypeId: Int!) {
  oilTypeResearchList(oilTypeId: $oilTypeId) {
    items {
      ...OilTypeResearchTableItem
    }
  }
}
    ${OilTypeResearchTableItemFragmentDoc}`;

/**
 * __useOilTypeResearchTableListQuery__
 *
 * To run a query within a React component, call `useOilTypeResearchTableListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOilTypeResearchTableListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOilTypeResearchTableListQuery({
 *   variables: {
 *      oilTypeId: // value for 'oilTypeId'
 *   },
 * });
 */
export function useOilTypeResearchTableListQuery(baseOptions: Apollo.QueryHookOptions<OilTypeResearchTableListQuery, OilTypeResearchTableListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OilTypeResearchTableListQuery, OilTypeResearchTableListQueryVariables>(OilTypeResearchTableListDocument, options);
      }
export function useOilTypeResearchTableListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OilTypeResearchTableListQuery, OilTypeResearchTableListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OilTypeResearchTableListQuery, OilTypeResearchTableListQueryVariables>(OilTypeResearchTableListDocument, options);
        }
export type OilTypeResearchTableListQueryHookResult = ReturnType<typeof useOilTypeResearchTableListQuery>;
export type OilTypeResearchTableListLazyQueryHookResult = ReturnType<typeof useOilTypeResearchTableListLazyQuery>;
export type OilTypeResearchTableListQueryResult = Apollo.QueryResult<OilTypeResearchTableListQuery, OilTypeResearchTableListQueryVariables>;
export const OilTypeResearchTableCreateDocument = gql`
    mutation OilTypeResearchTableCreate($oilTypeId: Int!, $input: OilTypeResearchCreateInput!) {
  oilTypeResearchCreate(oilTypeId: $oilTypeId, input: $input) {
    success
    error {
      message
    }
    record {
      ...OilTypeResearchTableItem
    }
  }
}
    ${OilTypeResearchTableItemFragmentDoc}`;
export type OilTypeResearchTableCreateMutationFn = Apollo.MutationFunction<OilTypeResearchTableCreateMutation, OilTypeResearchTableCreateMutationVariables>;

/**
 * __useOilTypeResearchTableCreateMutation__
 *
 * To run a mutation, you first call `useOilTypeResearchTableCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeResearchTableCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeResearchTableCreateMutation, { data, loading, error }] = useOilTypeResearchTableCreateMutation({
 *   variables: {
 *      oilTypeId: // value for 'oilTypeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOilTypeResearchTableCreateMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeResearchTableCreateMutation, OilTypeResearchTableCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeResearchTableCreateMutation, OilTypeResearchTableCreateMutationVariables>(OilTypeResearchTableCreateDocument, options);
      }
export type OilTypeResearchTableCreateMutationHookResult = ReturnType<typeof useOilTypeResearchTableCreateMutation>;
export type OilTypeResearchTableCreateMutationResult = Apollo.MutationResult<OilTypeResearchTableCreateMutation>;
export type OilTypeResearchTableCreateMutationOptions = Apollo.BaseMutationOptions<OilTypeResearchTableCreateMutation, OilTypeResearchTableCreateMutationVariables>;
export const OilTypeResearchTableUpdateDocument = gql`
    mutation OilTypeResearchTableUpdate($id: Int!, $input: OilTypeResearchUpdateInput!) {
  oilTypeResearchUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...OilTypeResearchTableItem
    }
  }
}
    ${OilTypeResearchTableItemFragmentDoc}`;
export type OilTypeResearchTableUpdateMutationFn = Apollo.MutationFunction<OilTypeResearchTableUpdateMutation, OilTypeResearchTableUpdateMutationVariables>;

/**
 * __useOilTypeResearchTableUpdateMutation__
 *
 * To run a mutation, you first call `useOilTypeResearchTableUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeResearchTableUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeResearchTableUpdateMutation, { data, loading, error }] = useOilTypeResearchTableUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOilTypeResearchTableUpdateMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeResearchTableUpdateMutation, OilTypeResearchTableUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeResearchTableUpdateMutation, OilTypeResearchTableUpdateMutationVariables>(OilTypeResearchTableUpdateDocument, options);
      }
export type OilTypeResearchTableUpdateMutationHookResult = ReturnType<typeof useOilTypeResearchTableUpdateMutation>;
export type OilTypeResearchTableUpdateMutationResult = Apollo.MutationResult<OilTypeResearchTableUpdateMutation>;
export type OilTypeResearchTableUpdateMutationOptions = Apollo.BaseMutationOptions<OilTypeResearchTableUpdateMutation, OilTypeResearchTableUpdateMutationVariables>;
export const OilTypeResearchTableDeleteDocument = gql`
    mutation OilTypeResearchTableDelete($id: Int!) {
  oilTypeResearchDelete(id: $id) {
    success
    error {
      message
    }
  }
}
    `;
export type OilTypeResearchTableDeleteMutationFn = Apollo.MutationFunction<OilTypeResearchTableDeleteMutation, OilTypeResearchTableDeleteMutationVariables>;

/**
 * __useOilTypeResearchTableDeleteMutation__
 *
 * To run a mutation, you first call `useOilTypeResearchTableDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOilTypeResearchTableDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oilTypeResearchTableDeleteMutation, { data, loading, error }] = useOilTypeResearchTableDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOilTypeResearchTableDeleteMutation(baseOptions?: Apollo.MutationHookOptions<OilTypeResearchTableDeleteMutation, OilTypeResearchTableDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OilTypeResearchTableDeleteMutation, OilTypeResearchTableDeleteMutationVariables>(OilTypeResearchTableDeleteDocument, options);
      }
export type OilTypeResearchTableDeleteMutationHookResult = ReturnType<typeof useOilTypeResearchTableDeleteMutation>;
export type OilTypeResearchTableDeleteMutationResult = Apollo.MutationResult<OilTypeResearchTableDeleteMutation>;
export type OilTypeResearchTableDeleteMutationOptions = Apollo.BaseMutationOptions<OilTypeResearchTableDeleteMutation, OilTypeResearchTableDeleteMutationVariables>;