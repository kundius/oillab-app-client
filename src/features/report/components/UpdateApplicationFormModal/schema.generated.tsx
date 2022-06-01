import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ReportUpdateApplicationFormModalFragment = { __typename?: 'ReportApplicationForm', id: number, customerOrganization?: Types.Maybe<string>, customerPhone?: Types.Maybe<string>, customerPerson?: Types.Maybe<string>, customerEmail?: Types.Maybe<string>, vehicleEquipmentManufacturer?: Types.Maybe<string>, vehicleRegistrationNumber?: Types.Maybe<string>, vehicleEquipmentModel?: Types.Maybe<string>, vehicleTotalOperatingTime?: Types.Maybe<string>, vehicleSamplingPoint?: Types.Maybe<string>, vehicleTotalOperatingTimeLubricant?: Types.Maybe<string>, vehicleLiquidVolume?: Types.Maybe<string>, vehicleToppingUpLubricant?: Types.Maybe<string>, lubricantBrand?: Types.Maybe<string>, lubricantViscosity?: Types.Maybe<string>, lubricantModel?: Types.Maybe<string>, lubricantState?: Types.Maybe<string>, selectionType?: Types.Maybe<string>, selectionVolume?: Types.Maybe<string>, selectionPlace?: Types.Maybe<string>, note?: Types.Maybe<string>, createdAt: any, updatedAt: any };

export type ReportUpdateApplicationFormModalMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.ReportUpdateApplicationFormInput;
}>;


export type ReportUpdateApplicationFormModalMutation = { __typename?: 'Mutation', reportUpdateApplicationForm: { __typename?: 'ReportUpdateApplicationFormResponse', success: boolean, record?: Types.Maybe<{ __typename?: 'Report', id: number, applicationForm?: Types.Maybe<{ __typename?: 'ReportApplicationForm', id: number, customerOrganization?: Types.Maybe<string>, customerPhone?: Types.Maybe<string>, customerPerson?: Types.Maybe<string>, customerEmail?: Types.Maybe<string>, vehicleEquipmentManufacturer?: Types.Maybe<string>, vehicleRegistrationNumber?: Types.Maybe<string>, vehicleEquipmentModel?: Types.Maybe<string>, vehicleTotalOperatingTime?: Types.Maybe<string>, vehicleSamplingPoint?: Types.Maybe<string>, vehicleTotalOperatingTimeLubricant?: Types.Maybe<string>, vehicleLiquidVolume?: Types.Maybe<string>, vehicleToppingUpLubricant?: Types.Maybe<string>, lubricantBrand?: Types.Maybe<string>, lubricantViscosity?: Types.Maybe<string>, lubricantModel?: Types.Maybe<string>, lubricantState?: Types.Maybe<string>, selectionType?: Types.Maybe<string>, selectionVolume?: Types.Maybe<string>, selectionPlace?: Types.Maybe<string>, note?: Types.Maybe<string>, createdAt: any, updatedAt: any }> }>, error?: Types.Maybe<{ __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string }> } };

export const ReportUpdateApplicationFormModalFragmentDoc = gql`
    fragment ReportUpdateApplicationFormModalFragment on ReportApplicationForm {
  id
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
  selectionType
  selectionVolume
  selectionPlace
  note
  createdAt
  updatedAt
}
    `;
export const ReportUpdateApplicationFormModalDocument = gql`
    mutation ReportUpdateApplicationFormModal($id: Int!, $input: ReportUpdateApplicationFormInput!) {
  reportUpdateApplicationForm(id: $id, input: $input) {
    success
    record {
      id
      applicationForm {
        ...ReportUpdateApplicationFormModalFragment
      }
    }
    error {
      message
    }
  }
}
    ${ReportUpdateApplicationFormModalFragmentDoc}`;
export type ReportUpdateApplicationFormModalMutationFn = Apollo.MutationFunction<ReportUpdateApplicationFormModalMutation, ReportUpdateApplicationFormModalMutationVariables>;

/**
 * __useReportUpdateApplicationFormModalMutation__
 *
 * To run a mutation, you first call `useReportUpdateApplicationFormModalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportUpdateApplicationFormModalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportUpdateApplicationFormModalMutation, { data, loading, error }] = useReportUpdateApplicationFormModalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReportUpdateApplicationFormModalMutation(baseOptions?: Apollo.MutationHookOptions<ReportUpdateApplicationFormModalMutation, ReportUpdateApplicationFormModalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportUpdateApplicationFormModalMutation, ReportUpdateApplicationFormModalMutationVariables>(ReportUpdateApplicationFormModalDocument, options);
      }
export type ReportUpdateApplicationFormModalMutationHookResult = ReturnType<typeof useReportUpdateApplicationFormModalMutation>;
export type ReportUpdateApplicationFormModalMutationResult = Apollo.MutationResult<ReportUpdateApplicationFormModalMutation>;
export type ReportUpdateApplicationFormModalMutationOptions = Apollo.BaseMutationOptions<ReportUpdateApplicationFormModalMutation, ReportUpdateApplicationFormModalMutationVariables>;