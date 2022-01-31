import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ReportUpdatePageFragment = { __typename?: 'Report', id: number, number?: Types.Maybe<number>, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, expressLaboratoryResult?: Types.Maybe<{ __typename?: 'File', id: number, name: string, url: string }>, laboratoryResult?: Types.Maybe<{ __typename?: 'File', id: number, name: string, url: string }>, client?: Types.Maybe<{ __typename?: 'User', id: number, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string }> };

export type ReportUpdatePageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type ReportUpdatePageQuery = { __typename?: 'Query', report?: Types.Maybe<{ __typename?: 'Report', id: number, number?: Types.Maybe<number>, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, expressLaboratoryResult?: Types.Maybe<{ __typename?: 'File', id: number, name: string, url: string }>, laboratoryResult?: Types.Maybe<{ __typename?: 'File', id: number, name: string, url: string }>, client?: Types.Maybe<{ __typename?: 'User', id: number, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string }> }>, currentUser?: Types.Maybe<{ __typename?: 'User', id: number, role: Types.UserRole }> };

export type ReportUpdatePageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.ReportUpdateInput;
}>;


export type ReportUpdatePageMutation = { __typename?: 'Mutation', reportUpdate: { __typename?: 'ReportUpdateResponse', success: boolean, error?: Types.Maybe<{ __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string }>, record?: Types.Maybe<{ __typename?: 'Report', id: number, number?: Types.Maybe<number>, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, expressLaboratoryResult?: Types.Maybe<{ __typename?: 'File', id: number, name: string, url: string }>, laboratoryResult?: Types.Maybe<{ __typename?: 'File', id: number, name: string, url: string }>, client?: Types.Maybe<{ __typename?: 'User', id: number, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string }> }> } };

export const ReportUpdatePageFragmentDoc = gql`
    fragment ReportUpdatePageFragment on Report {
  id
  number
  totalMileage
  lubricantMileage
  samplingNodes
  note
  lubricant
  sampledAt
  expressLaboratoryResult {
    id
    name
    url
  }
  laboratoryResult {
    id
    name
    url
  }
  client {
    id
    name
  }
  vehicle {
    id
    model
    stateNumber
    releaseYear
    engineModel
  }
}
    `;
export const ReportUpdatePageQueryDocument = gql`
    query ReportUpdatePageQuery($id: Int!) {
  report(id: $id) {
    ...ReportUpdatePageFragment
  }
  currentUser {
    id
    role
  }
}
    ${ReportUpdatePageFragmentDoc}`;

/**
 * __useReportUpdatePageQuery__
 *
 * To run a query within a React component, call `useReportUpdatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportUpdatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportUpdatePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReportUpdatePageQuery(baseOptions: Apollo.QueryHookOptions<ReportUpdatePageQuery, ReportUpdatePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportUpdatePageQuery, ReportUpdatePageQueryVariables>(ReportUpdatePageQueryDocument, options);
      }
export function useReportUpdatePageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportUpdatePageQuery, ReportUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportUpdatePageQuery, ReportUpdatePageQueryVariables>(ReportUpdatePageQueryDocument, options);
        }
export type ReportUpdatePageQueryHookResult = ReturnType<typeof useReportUpdatePageQuery>;
export type ReportUpdatePageQueryLazyQueryHookResult = ReturnType<typeof useReportUpdatePageQueryLazyQuery>;
export type ReportUpdatePageQueryQueryResult = Apollo.QueryResult<ReportUpdatePageQuery, ReportUpdatePageQueryVariables>;
export const ReportUpdatePageMutationDocument = gql`
    mutation ReportUpdatePageMutation($id: Int!, $input: ReportUpdateInput!) {
  reportUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...ReportUpdatePageFragment
    }
  }
}
    ${ReportUpdatePageFragmentDoc}`;
export type ReportUpdatePageMutationMutationFn = Apollo.MutationFunction<ReportUpdatePageMutation, ReportUpdatePageMutationVariables>;

/**
 * __useReportUpdatePageMutation__
 *
 * To run a mutation, you first call `useReportUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportUpdatePageMutation, { data, loading, error }] = useReportUpdatePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReportUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<ReportUpdatePageMutation, ReportUpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportUpdatePageMutation, ReportUpdatePageMutationVariables>(ReportUpdatePageMutationDocument, options);
      }
export type ReportUpdatePageMutationHookResult = ReturnType<typeof useReportUpdatePageMutation>;
export type ReportUpdatePageMutationMutationResult = Apollo.MutationResult<ReportUpdatePageMutation>;
export type ReportUpdatePageMutationMutationOptions = Apollo.BaseMutationOptions<ReportUpdatePageMutation, ReportUpdatePageMutationVariables>;