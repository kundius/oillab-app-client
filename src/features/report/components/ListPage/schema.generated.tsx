import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReportListPageItemFragment = { __typename?: 'Report', id: number, number?: number | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: string | null, color?: Types.ReportColor | null, sampledAt: any, formNumber?: string | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, viscosity?: string | null, brandEntity?: { __typename?: 'Brand', id: number, name: string } | null } | null, laboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, expressLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, consolidatedLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string } | null };

export type ReportListPageReportByFormNumberQueryVariables = Types.Exact<{
  formNumber: Types.Scalars['String']['input'];
}>;


export type ReportListPageReportByFormNumberQuery = { __typename?: 'Query', reportByFormNumber?: { __typename?: 'Report', id: number, number?: number | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: string | null, color?: Types.ReportColor | null, sampledAt: any, formNumber?: string | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, viscosity?: string | null, brandEntity?: { __typename?: 'Brand', id: number, name: string } | null } | null, laboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, expressLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, consolidatedLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string } | null } | null };

export type ReportListPageReportByStateNumberQueryVariables = Types.Exact<{
  stateNumber: Types.Scalars['String']['input'];
}>;


export type ReportListPageReportByStateNumberQuery = { __typename?: 'Query', reportByStateNumber?: { __typename?: 'Report', id: number, number?: number | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: string | null, color?: Types.ReportColor | null, sampledAt: any, formNumber?: string | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, viscosity?: string | null, brandEntity?: { __typename?: 'Brand', id: number, name: string } | null } | null, laboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, expressLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, consolidatedLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string } | null } | null };

export type ReportListPageReportPaginateQueryVariables = Types.Exact<{
  sort?: Types.InputMaybe<Array<Types.ReportSort> | Types.ReportSort>;
  filter?: Types.InputMaybe<Types.ReportFilter>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ReportListPageReportPaginateQuery = { __typename?: 'Query', reportPaginate: { __typename?: 'ReportPaginateResponse', pageInfo: { __typename?: 'PageInfo', total: number, page: number, perPage: number }, items: Array<{ __typename?: 'Report', id: number, number?: number | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: string | null, color?: Types.ReportColor | null, sampledAt: any, formNumber?: string | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, viscosity?: string | null, brandEntity?: { __typename?: 'Brand', id: number, name: string } | null } | null, laboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, expressLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, consolidatedLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string } | null }> } };

export type ReportListPageReportGeneratePdfMutationVariables = Types.Exact<{
  sort?: Types.InputMaybe<Array<Types.ReportSort> | Types.ReportSort>;
  filter?: Types.InputMaybe<Types.ReportFilter>;
}>;


export type ReportListPageReportGeneratePdfMutation = { __typename?: 'Mutation', reportGeneratePdf: { __typename?: 'ReportGeneratePdfResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'File', id: number, url: string } | null } };

export type ReportListPageReportConsolidateMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  input: Types.ReportConsolidateInput;
}>;


export type ReportListPageReportConsolidateMutation = { __typename?: 'Mutation', reportConsolidate: { __typename?: 'ReportConsolidateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Report', id: number, number?: number | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: string | null, color?: Types.ReportColor | null, sampledAt: any, formNumber?: string | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, viscosity?: string | null, brandEntity?: { __typename?: 'Brand', id: number, name: string } | null } | null, laboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, expressLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, consolidatedLaboratoryResult?: { __typename?: 'File', id: number, name: string, url: string } | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, releaseYear: string, stateNumber: string, engineModel: string } | null } | null } };

export const ReportListPageItemFragmentDoc = gql`
    fragment ReportListPageItem on Report {
  id
  number
  totalMileage
  lubricantMileage
  samplingNodes
  note
  color
  sampledAt
  formNumber
  lubricantEntity {
    id
    brandEntity {
      id
      name
    }
    model
    viscosity
  }
  laboratoryResult {
    id
    name
    url
  }
  expressLaboratoryResult {
    id
    name
    url
  }
  consolidatedLaboratoryResult {
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
    releaseYear
    stateNumber
    engineModel
  }
}
    `;
export const ReportListPageReportByFormNumberDocument = gql`
    query ReportListPageReportByFormNumber($formNumber: String!) {
  reportByFormNumber(formNumber: $formNumber) {
    ...ReportListPageItem
  }
}
    ${ReportListPageItemFragmentDoc}`;

/**
 * __useReportListPageReportByFormNumberQuery__
 *
 * To run a query within a React component, call `useReportListPageReportByFormNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportListPageReportByFormNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportListPageReportByFormNumberQuery({
 *   variables: {
 *      formNumber: // value for 'formNumber'
 *   },
 * });
 */
export function useReportListPageReportByFormNumberQuery(baseOptions: Apollo.QueryHookOptions<ReportListPageReportByFormNumberQuery, ReportListPageReportByFormNumberQueryVariables> & ({ variables: ReportListPageReportByFormNumberQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportListPageReportByFormNumberQuery, ReportListPageReportByFormNumberQueryVariables>(ReportListPageReportByFormNumberDocument, options);
      }
export function useReportListPageReportByFormNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportListPageReportByFormNumberQuery, ReportListPageReportByFormNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportListPageReportByFormNumberQuery, ReportListPageReportByFormNumberQueryVariables>(ReportListPageReportByFormNumberDocument, options);
        }
export function useReportListPageReportByFormNumberSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReportListPageReportByFormNumberQuery, ReportListPageReportByFormNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportListPageReportByFormNumberQuery, ReportListPageReportByFormNumberQueryVariables>(ReportListPageReportByFormNumberDocument, options);
        }
export type ReportListPageReportByFormNumberQueryHookResult = ReturnType<typeof useReportListPageReportByFormNumberQuery>;
export type ReportListPageReportByFormNumberLazyQueryHookResult = ReturnType<typeof useReportListPageReportByFormNumberLazyQuery>;
export type ReportListPageReportByFormNumberSuspenseQueryHookResult = ReturnType<typeof useReportListPageReportByFormNumberSuspenseQuery>;
export type ReportListPageReportByFormNumberQueryResult = Apollo.QueryResult<ReportListPageReportByFormNumberQuery, ReportListPageReportByFormNumberQueryVariables>;
export const ReportListPageReportByStateNumberDocument = gql`
    query ReportListPageReportByStateNumber($stateNumber: String!) {
  reportByStateNumber(stateNumber: $stateNumber) {
    ...ReportListPageItem
  }
}
    ${ReportListPageItemFragmentDoc}`;

/**
 * __useReportListPageReportByStateNumberQuery__
 *
 * To run a query within a React component, call `useReportListPageReportByStateNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportListPageReportByStateNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportListPageReportByStateNumberQuery({
 *   variables: {
 *      stateNumber: // value for 'stateNumber'
 *   },
 * });
 */
export function useReportListPageReportByStateNumberQuery(baseOptions: Apollo.QueryHookOptions<ReportListPageReportByStateNumberQuery, ReportListPageReportByStateNumberQueryVariables> & ({ variables: ReportListPageReportByStateNumberQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportListPageReportByStateNumberQuery, ReportListPageReportByStateNumberQueryVariables>(ReportListPageReportByStateNumberDocument, options);
      }
export function useReportListPageReportByStateNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportListPageReportByStateNumberQuery, ReportListPageReportByStateNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportListPageReportByStateNumberQuery, ReportListPageReportByStateNumberQueryVariables>(ReportListPageReportByStateNumberDocument, options);
        }
export function useReportListPageReportByStateNumberSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReportListPageReportByStateNumberQuery, ReportListPageReportByStateNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportListPageReportByStateNumberQuery, ReportListPageReportByStateNumberQueryVariables>(ReportListPageReportByStateNumberDocument, options);
        }
export type ReportListPageReportByStateNumberQueryHookResult = ReturnType<typeof useReportListPageReportByStateNumberQuery>;
export type ReportListPageReportByStateNumberLazyQueryHookResult = ReturnType<typeof useReportListPageReportByStateNumberLazyQuery>;
export type ReportListPageReportByStateNumberSuspenseQueryHookResult = ReturnType<typeof useReportListPageReportByStateNumberSuspenseQuery>;
export type ReportListPageReportByStateNumberQueryResult = Apollo.QueryResult<ReportListPageReportByStateNumberQuery, ReportListPageReportByStateNumberQueryVariables>;
export const ReportListPageReportPaginateDocument = gql`
    query ReportListPageReportPaginate($sort: [ReportSort!], $filter: ReportFilter, $page: Int, $perPage: Int) {
  reportPaginate(sort: $sort, filter: $filter, page: $page, perPage: $perPage) {
    pageInfo {
      total
      page
      perPage
    }
    items {
      ...ReportListPageItem
    }
  }
}
    ${ReportListPageItemFragmentDoc}`;

/**
 * __useReportListPageReportPaginateQuery__
 *
 * To run a query within a React component, call `useReportListPageReportPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportListPageReportPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportListPageReportPaginateQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useReportListPageReportPaginateQuery(baseOptions?: Apollo.QueryHookOptions<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>(ReportListPageReportPaginateDocument, options);
      }
export function useReportListPageReportPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>(ReportListPageReportPaginateDocument, options);
        }
export function useReportListPageReportPaginateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>(ReportListPageReportPaginateDocument, options);
        }
export type ReportListPageReportPaginateQueryHookResult = ReturnType<typeof useReportListPageReportPaginateQuery>;
export type ReportListPageReportPaginateLazyQueryHookResult = ReturnType<typeof useReportListPageReportPaginateLazyQuery>;
export type ReportListPageReportPaginateSuspenseQueryHookResult = ReturnType<typeof useReportListPageReportPaginateSuspenseQuery>;
export type ReportListPageReportPaginateQueryResult = Apollo.QueryResult<ReportListPageReportPaginateQuery, ReportListPageReportPaginateQueryVariables>;
export const ReportListPageReportGeneratePdfDocument = gql`
    mutation ReportListPageReportGeneratePdf($sort: [ReportSort!], $filter: ReportFilter) {
  reportGeneratePdf(sort: $sort, filter: $filter) {
    success
    error {
      message
    }
    record {
      id
      url
    }
  }
}
    `;
export type ReportListPageReportGeneratePdfMutationFn = Apollo.MutationFunction<ReportListPageReportGeneratePdfMutation, ReportListPageReportGeneratePdfMutationVariables>;

/**
 * __useReportListPageReportGeneratePdfMutation__
 *
 * To run a mutation, you first call `useReportListPageReportGeneratePdfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportListPageReportGeneratePdfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportListPageReportGeneratePdfMutation, { data, loading, error }] = useReportListPageReportGeneratePdfMutation({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useReportListPageReportGeneratePdfMutation(baseOptions?: Apollo.MutationHookOptions<ReportListPageReportGeneratePdfMutation, ReportListPageReportGeneratePdfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportListPageReportGeneratePdfMutation, ReportListPageReportGeneratePdfMutationVariables>(ReportListPageReportGeneratePdfDocument, options);
      }
export type ReportListPageReportGeneratePdfMutationHookResult = ReturnType<typeof useReportListPageReportGeneratePdfMutation>;
export type ReportListPageReportGeneratePdfMutationResult = Apollo.MutationResult<ReportListPageReportGeneratePdfMutation>;
export type ReportListPageReportGeneratePdfMutationOptions = Apollo.BaseMutationOptions<ReportListPageReportGeneratePdfMutation, ReportListPageReportGeneratePdfMutationVariables>;
export const ReportListPageReportConsolidateDocument = gql`
    mutation ReportListPageReportConsolidate($id: Int!, $input: ReportConsolidateInput!) {
  reportConsolidate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...ReportListPageItem
    }
  }
}
    ${ReportListPageItemFragmentDoc}`;
export type ReportListPageReportConsolidateMutationFn = Apollo.MutationFunction<ReportListPageReportConsolidateMutation, ReportListPageReportConsolidateMutationVariables>;

/**
 * __useReportListPageReportConsolidateMutation__
 *
 * To run a mutation, you first call `useReportListPageReportConsolidateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportListPageReportConsolidateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportListPageReportConsolidateMutation, { data, loading, error }] = useReportListPageReportConsolidateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReportListPageReportConsolidateMutation(baseOptions?: Apollo.MutationHookOptions<ReportListPageReportConsolidateMutation, ReportListPageReportConsolidateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportListPageReportConsolidateMutation, ReportListPageReportConsolidateMutationVariables>(ReportListPageReportConsolidateDocument, options);
      }
export type ReportListPageReportConsolidateMutationHookResult = ReturnType<typeof useReportListPageReportConsolidateMutation>;
export type ReportListPageReportConsolidateMutationResult = Apollo.MutationResult<ReportListPageReportConsolidateMutation>;
export type ReportListPageReportConsolidateMutationOptions = Apollo.BaseMutationOptions<ReportListPageReportConsolidateMutation, ReportListPageReportConsolidateMutationVariables>;