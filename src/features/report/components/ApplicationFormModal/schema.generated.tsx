import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReportApplicationFormModalFragment = { __typename?: 'ReportApplicationForm', id: number, vehicleSamplingPoint?: string | null, vehicleToppingUpLubricant?: string | null, lubricantState?: string | null, selectionVolume?: string | null, note?: string | null, createdAt: any, updatedAt: any };

export type ReportApplicationFormModalMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  input: Types.ReportUpdateApplicationFormInput;
}>;


export type ReportApplicationFormModalMutation = { __typename?: 'Mutation', reportUpdateApplicationForm: { __typename?: 'ReportUpdateApplicationFormResponse', success: boolean, record?: { __typename?: 'Report', id: number, applicationForm?: { __typename?: 'ReportApplicationForm', id: number, vehicleSamplingPoint?: string | null, vehicleToppingUpLubricant?: string | null, lubricantState?: string | null, selectionVolume?: string | null, note?: string | null, createdAt: any, updatedAt: any } | null } | null, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };

export const ReportApplicationFormModalFragmentDoc = gql`
    fragment ReportApplicationFormModalFragment on ReportApplicationForm {
  id
  vehicleSamplingPoint
  vehicleToppingUpLubricant
  lubricantState
  selectionVolume
  note
  createdAt
  updatedAt
}
    `;
export const ReportApplicationFormModalDocument = gql`
    mutation ReportApplicationFormModal($id: Int!, $input: ReportUpdateApplicationFormInput!) {
  reportUpdateApplicationForm(id: $id, input: $input) {
    success
    record {
      id
      applicationForm {
        ...ReportApplicationFormModalFragment
      }
    }
    error {
      message
    }
  }
}
    ${ReportApplicationFormModalFragmentDoc}`;
export type ReportApplicationFormModalMutationFn = Apollo.MutationFunction<ReportApplicationFormModalMutation, ReportApplicationFormModalMutationVariables>;

/**
 * __useReportApplicationFormModalMutation__
 *
 * To run a mutation, you first call `useReportApplicationFormModalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportApplicationFormModalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportApplicationFormModalMutation, { data, loading, error }] = useReportApplicationFormModalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReportApplicationFormModalMutation(baseOptions?: Apollo.MutationHookOptions<ReportApplicationFormModalMutation, ReportApplicationFormModalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportApplicationFormModalMutation, ReportApplicationFormModalMutationVariables>(ReportApplicationFormModalDocument, options);
      }
export type ReportApplicationFormModalMutationHookResult = ReturnType<typeof useReportApplicationFormModalMutation>;
export type ReportApplicationFormModalMutationResult = Apollo.MutationResult<ReportApplicationFormModalMutation>;
export type ReportApplicationFormModalMutationOptions = Apollo.BaseMutationOptions<ReportApplicationFormModalMutation, ReportApplicationFormModalMutationVariables>;