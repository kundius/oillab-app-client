import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReportUpdatePageFragment = { __typename?: 'Report', id: number, number?: number | null, formNumber?: string | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, vehicleToppingUpLubricant?: string | null, lubricantState?: string | null, selectionVolume?: string | null, note?: string | null, color?: Types.ReportColor | null, sampledAt: any, expressLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, laboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string } | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, brand: string, model: string, viscosity?: string | null } | null, oilType?: { __typename?: 'OilType', id: number, name: string } | null };

export type ReportUpdatePageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type ReportUpdatePageQuery = { __typename?: 'Query', report?: { __typename?: 'Report', id: number, number?: number | null, formNumber?: string | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, vehicleToppingUpLubricant?: string | null, lubricantState?: string | null, selectionVolume?: string | null, note?: string | null, color?: Types.ReportColor | null, sampledAt: any, expressLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, laboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string } | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, brand: string, model: string, viscosity?: string | null } | null, oilType?: { __typename?: 'OilType', id: number, name: string } | null } | null, currentUser?: { __typename?: 'User', id: number, role: Types.UserRole } | null };

export type ReportUpdatePageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.ReportUpdateInput;
}>;


export type ReportUpdatePageMutation = { __typename?: 'Mutation', reportUpdate: { __typename?: 'ReportUpdateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Report', id: number, number?: number | null, formNumber?: string | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, vehicleToppingUpLubricant?: string | null, lubricantState?: string | null, selectionVolume?: string | null, note?: string | null, color?: Types.ReportColor | null, sampledAt: any, expressLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, laboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string } | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, brand: string, model: string, viscosity?: string | null } | null, oilType?: { __typename?: 'OilType', id: number, name: string } | null } | null } };

export const ReportUpdatePageFragmentDoc = gql`
    fragment ReportUpdatePageFragment on Report {
  id
  number
  formNumber
  totalMileage
  lubricantMileage
  samplingNodes
  vehicleToppingUpLubricant
  lubricantState
  selectionVolume
  note
  color
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
  lubricantEntity {
    id
    brand
    model
    viscosity
  }
  oilType {
    id
    name
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