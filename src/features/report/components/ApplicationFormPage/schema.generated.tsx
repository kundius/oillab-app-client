import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReportApplicationFormPageFragment = { __typename?: 'Report', id: number, number?: number | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: string | null, lubricant: string, sampledAt: any, client?: { __typename?: 'User', id: number, organization?: string | null, phone?: string | null, name: string, email: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string } | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity: string, productType?: Types.ProductType | null } | null, applicationForm?: { __typename?: 'ReportApplicationForm', id: number, vehicleEquipmentManufacturer?: string | null, vehicleRegistrationNumber?: string | null, vehicleEquipmentModel?: string | null, vehicleTotalOperatingTime?: string | null, vehicleSamplingPoint?: string | null, vehicleTotalOperatingTimeLubricant?: string | null, vehicleLiquidVolume?: string | null, vehicleToppingUpLubricant?: string | null, lubricantState?: string | null, selectionVolume?: string | null, selectionPlace?: string | null, note?: string | null, createdAt: any, updatedAt: any } | null };

export type ReportApplicationFormPageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type ReportApplicationFormPageQuery = { __typename?: 'Query', report?: { __typename?: 'Report', id: number, number?: number | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: string | null, lubricant: string, sampledAt: any, client?: { __typename?: 'User', id: number, organization?: string | null, phone?: string | null, name: string, email: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string } | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity: string, productType?: Types.ProductType | null } | null, applicationForm?: { __typename?: 'ReportApplicationForm', id: number, vehicleEquipmentManufacturer?: string | null, vehicleRegistrationNumber?: string | null, vehicleEquipmentModel?: string | null, vehicleTotalOperatingTime?: string | null, vehicleSamplingPoint?: string | null, vehicleTotalOperatingTimeLubricant?: string | null, vehicleLiquidVolume?: string | null, vehicleToppingUpLubricant?: string | null, lubricantState?: string | null, selectionVolume?: string | null, selectionPlace?: string | null, note?: string | null, createdAt: any, updatedAt: any } | null } | null, currentUser?: { __typename?: 'User', id: number, role: Types.UserRole } | null };

export type ReportApplicationFormPageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.ReportUpdateApplicationFormInput;
}>;


export type ReportApplicationFormPageMutation = { __typename?: 'Mutation', reportUpdateApplicationForm: { __typename?: 'ReportUpdateApplicationFormResponse', success: boolean, record?: { __typename?: 'Report', id: number, number?: number | null, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: string | null, lubricant: string, sampledAt: any, client?: { __typename?: 'User', id: number, organization?: string | null, phone?: string | null, name: string, email: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string } | null, lubricantEntity?: { __typename?: 'Lubricant', id: number, model: string, brand: string, viscosity: string, productType?: Types.ProductType | null } | null, applicationForm?: { __typename?: 'ReportApplicationForm', id: number, vehicleEquipmentManufacturer?: string | null, vehicleRegistrationNumber?: string | null, vehicleEquipmentModel?: string | null, vehicleTotalOperatingTime?: string | null, vehicleSamplingPoint?: string | null, vehicleTotalOperatingTimeLubricant?: string | null, vehicleLiquidVolume?: string | null, vehicleToppingUpLubricant?: string | null, lubricantState?: string | null, selectionVolume?: string | null, selectionPlace?: string | null, note?: string | null, createdAt: any, updatedAt: any } | null } | null, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };

export const ReportApplicationFormPageFragmentDoc = gql`
    fragment ReportApplicationFormPageFragment on Report {
  id
  number
  totalMileage
  lubricantMileage
  samplingNodes
  note
  lubricant
  sampledAt
  client {
    id
    organization
    phone
    name
    email
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
    model
    brand
    viscosity
    productType
  }
  applicationForm {
    id
    vehicleEquipmentManufacturer
    vehicleRegistrationNumber
    vehicleEquipmentModel
    vehicleTotalOperatingTime
    vehicleSamplingPoint
    vehicleTotalOperatingTimeLubricant
    vehicleLiquidVolume
    vehicleToppingUpLubricant
    lubricantState
    selectionVolume
    selectionPlace
    note
    createdAt
    updatedAt
  }
}
    `;
export const ReportApplicationFormPageQueryDocument = gql`
    query ReportApplicationFormPageQuery($id: Int!) {
  report(id: $id) {
    ...ReportApplicationFormPageFragment
  }
  currentUser {
    id
    role
  }
}
    ${ReportApplicationFormPageFragmentDoc}`;

/**
 * __useReportApplicationFormPageQuery__
 *
 * To run a query within a React component, call `useReportApplicationFormPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportApplicationFormPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportApplicationFormPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReportApplicationFormPageQuery(baseOptions: Apollo.QueryHookOptions<ReportApplicationFormPageQuery, ReportApplicationFormPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportApplicationFormPageQuery, ReportApplicationFormPageQueryVariables>(ReportApplicationFormPageQueryDocument, options);
      }
export function useReportApplicationFormPageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportApplicationFormPageQuery, ReportApplicationFormPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportApplicationFormPageQuery, ReportApplicationFormPageQueryVariables>(ReportApplicationFormPageQueryDocument, options);
        }
export type ReportApplicationFormPageQueryHookResult = ReturnType<typeof useReportApplicationFormPageQuery>;
export type ReportApplicationFormPageQueryLazyQueryHookResult = ReturnType<typeof useReportApplicationFormPageQueryLazyQuery>;
export type ReportApplicationFormPageQueryQueryResult = Apollo.QueryResult<ReportApplicationFormPageQuery, ReportApplicationFormPageQueryVariables>;
export const ReportApplicationFormPageMutationDocument = gql`
    mutation ReportApplicationFormPageMutation($id: Int!, $input: ReportUpdateApplicationFormInput!) {
  reportUpdateApplicationForm(id: $id, input: $input) {
    success
    record {
      ...ReportApplicationFormPageFragment
    }
    error {
      message
    }
  }
}
    ${ReportApplicationFormPageFragmentDoc}`;
export type ReportApplicationFormPageMutationMutationFn = Apollo.MutationFunction<ReportApplicationFormPageMutation, ReportApplicationFormPageMutationVariables>;

/**
 * __useReportApplicationFormPageMutation__
 *
 * To run a mutation, you first call `useReportApplicationFormPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportApplicationFormPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportApplicationFormPageMutation, { data, loading, error }] = useReportApplicationFormPageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReportApplicationFormPageMutation(baseOptions?: Apollo.MutationHookOptions<ReportApplicationFormPageMutation, ReportApplicationFormPageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportApplicationFormPageMutation, ReportApplicationFormPageMutationVariables>(ReportApplicationFormPageMutationDocument, options);
      }
export type ReportApplicationFormPageMutationHookResult = ReturnType<typeof useReportApplicationFormPageMutation>;
export type ReportApplicationFormPageMutationMutationResult = Apollo.MutationResult<ReportApplicationFormPageMutation>;
export type ReportApplicationFormPageMutationMutationOptions = Apollo.BaseMutationOptions<ReportApplicationFormPageMutation, ReportApplicationFormPageMutationVariables>;