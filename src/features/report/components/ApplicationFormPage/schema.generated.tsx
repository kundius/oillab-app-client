import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ReportApplicationFormPageFragment = { __typename?: 'Report', id: number, number?: Types.Maybe<number>, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, client?: Types.Maybe<{ __typename?: 'User', id: number, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string }>, applicationForm?: Types.Maybe<{ __typename?: 'ReportApplicationForm', id: number, productType?: Types.Maybe<Types.ProductType>, customerOrganization?: Types.Maybe<string>, customerPhone?: Types.Maybe<string>, customerPerson?: Types.Maybe<string>, customerEmail?: Types.Maybe<string>, vehicleEquipmentManufacturer?: Types.Maybe<string>, vehicleRegistrationNumber?: Types.Maybe<string>, vehicleEquipmentModel?: Types.Maybe<string>, vehicleTotalOperatingTime?: Types.Maybe<string>, vehicleSamplingPoint?: Types.Maybe<string>, vehicleTotalOperatingTimeLubricant?: Types.Maybe<string>, vehicleLiquidVolume?: Types.Maybe<string>, vehicleToppingUpLubricant?: Types.Maybe<string>, lubricantBrand?: Types.Maybe<string>, lubricantViscosity?: Types.Maybe<string>, lubricantModel?: Types.Maybe<string>, lubricantState?: Types.Maybe<string>, selectionVolume?: Types.Maybe<string>, selectionPlace?: Types.Maybe<string>, note?: Types.Maybe<string>, createdAt: any, updatedAt: any }> };

export type ReportApplicationFormPageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type ReportApplicationFormPageQuery = { __typename?: 'Query', report?: Types.Maybe<{ __typename?: 'Report', id: number, number?: Types.Maybe<number>, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, client?: Types.Maybe<{ __typename?: 'User', id: number, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string }>, applicationForm?: Types.Maybe<{ __typename?: 'ReportApplicationForm', id: number, productType?: Types.Maybe<Types.ProductType>, customerOrganization?: Types.Maybe<string>, customerPhone?: Types.Maybe<string>, customerPerson?: Types.Maybe<string>, customerEmail?: Types.Maybe<string>, vehicleEquipmentManufacturer?: Types.Maybe<string>, vehicleRegistrationNumber?: Types.Maybe<string>, vehicleEquipmentModel?: Types.Maybe<string>, vehicleTotalOperatingTime?: Types.Maybe<string>, vehicleSamplingPoint?: Types.Maybe<string>, vehicleTotalOperatingTimeLubricant?: Types.Maybe<string>, vehicleLiquidVolume?: Types.Maybe<string>, vehicleToppingUpLubricant?: Types.Maybe<string>, lubricantBrand?: Types.Maybe<string>, lubricantViscosity?: Types.Maybe<string>, lubricantModel?: Types.Maybe<string>, lubricantState?: Types.Maybe<string>, selectionVolume?: Types.Maybe<string>, selectionPlace?: Types.Maybe<string>, note?: Types.Maybe<string>, createdAt: any, updatedAt: any }> }>, currentUser?: Types.Maybe<{ __typename?: 'User', id: number, role: Types.UserRole }> };

export type ReportApplicationFormPageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.ReportUpdateApplicationFormInput;
}>;


export type ReportApplicationFormPageMutation = { __typename?: 'Mutation', reportUpdateApplicationForm: { __typename?: 'ReportUpdateApplicationFormResponse', success: boolean, record?: Types.Maybe<{ __typename?: 'Report', id: number, number?: Types.Maybe<number>, totalMileage: string, lubricantMileage: string, samplingNodes: string, note?: Types.Maybe<string>, lubricant: string, sampledAt: any, client?: Types.Maybe<{ __typename?: 'User', id: number, name: string }>, vehicle?: Types.Maybe<{ __typename?: 'Vehicle', id: number, model: string, stateNumber: string, releaseYear: string, engineModel: string }>, applicationForm?: Types.Maybe<{ __typename?: 'ReportApplicationForm', id: number, productType?: Types.Maybe<Types.ProductType>, customerOrganization?: Types.Maybe<string>, customerPhone?: Types.Maybe<string>, customerPerson?: Types.Maybe<string>, customerEmail?: Types.Maybe<string>, vehicleEquipmentManufacturer?: Types.Maybe<string>, vehicleRegistrationNumber?: Types.Maybe<string>, vehicleEquipmentModel?: Types.Maybe<string>, vehicleTotalOperatingTime?: Types.Maybe<string>, vehicleSamplingPoint?: Types.Maybe<string>, vehicleTotalOperatingTimeLubricant?: Types.Maybe<string>, vehicleLiquidVolume?: Types.Maybe<string>, vehicleToppingUpLubricant?: Types.Maybe<string>, lubricantBrand?: Types.Maybe<string>, lubricantViscosity?: Types.Maybe<string>, lubricantModel?: Types.Maybe<string>, lubricantState?: Types.Maybe<string>, selectionVolume?: Types.Maybe<string>, selectionPlace?: Types.Maybe<string>, note?: Types.Maybe<string>, createdAt: any, updatedAt: any }> }>, error?: Types.Maybe<{ __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string }> } };

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
    name
  }
  vehicle {
    id
    model
    stateNumber
    releaseYear
    engineModel
  }
  applicationForm {
    id
    productType
    customerOrganization
    customerPhone
    customerPerson
    customerEmail
    vehicleEquipmentManufacturer
    vehicleRegistrationNumber
    vehicleEquipmentModel
    vehicleTotalOperatingTime
    vehicleSamplingPoint
    vehicleTotalOperatingTimeLubricant
    vehicleLiquidVolume
    vehicleToppingUpLubricant
    lubricantBrand
    lubricantViscosity
    lubricantModel
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