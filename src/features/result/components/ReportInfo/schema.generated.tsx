import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Result_ReportInfo_ReportFragment = { __typename?: 'Report', id: number, totalMileage: string, lubricantMileage: string, vehicleToppingUpLubricant?: string | null, samplingNodes: string, lubricantState?: string | null, note?: string | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, engineModel: string, stateNumber: string, liquidVolume?: string | null, releaseYear: string } | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, viscosity?: string | null, brandEntity?: { __typename?: 'Brand', id: number, name: string } | null } | null };

export type Result_ReportInfo_QueryVariables = Types.Exact<{
  formNumber: Types.Scalars['String']['input'];
}>;


export type Result_ReportInfo_Query = { __typename?: 'Query', reportByFormNumber?: { __typename?: 'Report', id: number, totalMileage: string, lubricantMileage: string, vehicleToppingUpLubricant?: string | null, samplingNodes: string, lubricantState?: string | null, note?: string | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, engineModel: string, stateNumber: string, liquidVolume?: string | null, releaseYear: string } | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, viscosity?: string | null, brandEntity?: { __typename?: 'Brand', id: number, name: string } | null } | null } | null };

export const Result_ReportInfo_ReportFragmentDoc = gql`
    fragment Result_ReportInfo_ReportFragment on Report {
  id
  totalMileage
  lubricantMileage
  vehicleToppingUpLubricant
  samplingNodes
  lubricantState
  note
  vehicle {
    id
    model
    engineModel
    stateNumber
    liquidVolume
    releaseYear
  }
  lubricantEntity {
    id
    brandEntity {
      id
      name
    }
    model
    viscosity
  }
}
    `;
export const Result_ReportInfo_QueryDocument = gql`
    query Result_ReportInfo_Query($formNumber: String!) {
  reportByFormNumber(formNumber: $formNumber) {
    ...Result_ReportInfo_ReportFragment
  }
}
    ${Result_ReportInfo_ReportFragmentDoc}`;

/**
 * __useResult_ReportInfo_Query__
 *
 * To run a query within a React component, call `useResult_ReportInfo_Query` and pass it any options that fit your needs.
 * When your component renders, `useResult_ReportInfo_Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResult_ReportInfo_Query({
 *   variables: {
 *      formNumber: // value for 'formNumber'
 *   },
 * });
 */
export function useResult_ReportInfo_Query(baseOptions: Apollo.QueryHookOptions<Result_ReportInfo_Query, Result_ReportInfo_QueryVariables> & ({ variables: Result_ReportInfo_QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Result_ReportInfo_Query, Result_ReportInfo_QueryVariables>(Result_ReportInfo_QueryDocument, options);
      }
export function useResult_ReportInfo_QueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Result_ReportInfo_Query, Result_ReportInfo_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Result_ReportInfo_Query, Result_ReportInfo_QueryVariables>(Result_ReportInfo_QueryDocument, options);
        }
export function useResult_ReportInfo_QuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Result_ReportInfo_Query, Result_ReportInfo_QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Result_ReportInfo_Query, Result_ReportInfo_QueryVariables>(Result_ReportInfo_QueryDocument, options);
        }
export type Result_ReportInfo_QueryHookResult = ReturnType<typeof useResult_ReportInfo_Query>;
export type Result_ReportInfo_QueryLazyQueryHookResult = ReturnType<typeof useResult_ReportInfo_QueryLazyQuery>;
export type Result_ReportInfo_QuerySuspenseQueryHookResult = ReturnType<typeof useResult_ReportInfo_QuerySuspenseQuery>;
export type Result_ReportInfo_QueryQueryResult = Apollo.QueryResult<Result_ReportInfo_Query, Result_ReportInfo_QueryVariables>;