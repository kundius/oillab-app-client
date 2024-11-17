import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MailingIndexPageUserQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type MailingIndexPageUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name: string, email: string } | null };

export type MailingIndexPageReportQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type MailingIndexPageReportQuery = { __typename?: 'Query', report?: { __typename?: 'Report', id: number, formNumber?: string | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string } | null, laboratoryResult?: { __typename?: 'File', id: number } | null, expressLaboratoryResult?: { __typename?: 'File', id: number } | null } | null };

export type MailingIndexPageReportByFormNumberQueryVariables = Types.Exact<{
  formNumber: Types.Scalars['String']['input'];
}>;


export type MailingIndexPageReportByFormNumberQuery = { __typename?: 'Query', reportByFormNumber?: { __typename?: 'Report', id: number, formNumber?: string | null, client?: { __typename?: 'User', id: number, name: string } | null, vehicle?: { __typename?: 'Vehicle', id: number, model: string } | null, laboratoryResult?: { __typename?: 'File', id: number } | null, expressLaboratoryResult?: { __typename?: 'File', id: number } | null } | null };

export type MailingIndexPageReportSendMutationVariables = Types.Exact<{
  input: Types.ReportSendInput;
}>;


export type MailingIndexPageReportSendMutation = { __typename?: 'Mutation', reportSend: { __typename?: 'ReportSendResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null } };


export const MailingIndexPageUserQueryDocument = gql`
    query MailingIndexPageUserQuery($id: Int!) {
  user(id: $id) {
    id
    name
    email
  }
}
    `;

/**
 * __useMailingIndexPageUserQuery__
 *
 * To run a query within a React component, call `useMailingIndexPageUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailingIndexPageUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailingIndexPageUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMailingIndexPageUserQuery(baseOptions: Apollo.QueryHookOptions<MailingIndexPageUserQuery, MailingIndexPageUserQueryVariables> & ({ variables: MailingIndexPageUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailingIndexPageUserQuery, MailingIndexPageUserQueryVariables>(MailingIndexPageUserQueryDocument, options);
      }
export function useMailingIndexPageUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailingIndexPageUserQuery, MailingIndexPageUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailingIndexPageUserQuery, MailingIndexPageUserQueryVariables>(MailingIndexPageUserQueryDocument, options);
        }
export function useMailingIndexPageUserQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MailingIndexPageUserQuery, MailingIndexPageUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MailingIndexPageUserQuery, MailingIndexPageUserQueryVariables>(MailingIndexPageUserQueryDocument, options);
        }
export type MailingIndexPageUserQueryHookResult = ReturnType<typeof useMailingIndexPageUserQuery>;
export type MailingIndexPageUserQueryLazyQueryHookResult = ReturnType<typeof useMailingIndexPageUserQueryLazyQuery>;
export type MailingIndexPageUserQuerySuspenseQueryHookResult = ReturnType<typeof useMailingIndexPageUserQuerySuspenseQuery>;
export type MailingIndexPageUserQueryQueryResult = Apollo.QueryResult<MailingIndexPageUserQuery, MailingIndexPageUserQueryVariables>;
export const MailingIndexPageReportQueryDocument = gql`
    query MailingIndexPageReportQuery($id: Int!) {
  report(id: $id) {
    id
    formNumber
    client {
      id
      name
    }
    vehicle {
      id
      model
    }
    laboratoryResult {
      id
    }
    expressLaboratoryResult {
      id
    }
  }
}
    `;

/**
 * __useMailingIndexPageReportQuery__
 *
 * To run a query within a React component, call `useMailingIndexPageReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailingIndexPageReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailingIndexPageReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMailingIndexPageReportQuery(baseOptions: Apollo.QueryHookOptions<MailingIndexPageReportQuery, MailingIndexPageReportQueryVariables> & ({ variables: MailingIndexPageReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailingIndexPageReportQuery, MailingIndexPageReportQueryVariables>(MailingIndexPageReportQueryDocument, options);
      }
export function useMailingIndexPageReportQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailingIndexPageReportQuery, MailingIndexPageReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailingIndexPageReportQuery, MailingIndexPageReportQueryVariables>(MailingIndexPageReportQueryDocument, options);
        }
export function useMailingIndexPageReportQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MailingIndexPageReportQuery, MailingIndexPageReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MailingIndexPageReportQuery, MailingIndexPageReportQueryVariables>(MailingIndexPageReportQueryDocument, options);
        }
export type MailingIndexPageReportQueryHookResult = ReturnType<typeof useMailingIndexPageReportQuery>;
export type MailingIndexPageReportQueryLazyQueryHookResult = ReturnType<typeof useMailingIndexPageReportQueryLazyQuery>;
export type MailingIndexPageReportQuerySuspenseQueryHookResult = ReturnType<typeof useMailingIndexPageReportQuerySuspenseQuery>;
export type MailingIndexPageReportQueryQueryResult = Apollo.QueryResult<MailingIndexPageReportQuery, MailingIndexPageReportQueryVariables>;
export const MailingIndexPageReportByFormNumberQueryDocument = gql`
    query MailingIndexPageReportByFormNumberQuery($formNumber: String!) {
  reportByFormNumber(formNumber: $formNumber) {
    id
    formNumber
    client {
      id
      name
    }
    vehicle {
      id
      model
    }
    laboratoryResult {
      id
    }
    expressLaboratoryResult {
      id
    }
  }
}
    `;

/**
 * __useMailingIndexPageReportByFormNumberQuery__
 *
 * To run a query within a React component, call `useMailingIndexPageReportByFormNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailingIndexPageReportByFormNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailingIndexPageReportByFormNumberQuery({
 *   variables: {
 *      formNumber: // value for 'formNumber'
 *   },
 * });
 */
export function useMailingIndexPageReportByFormNumberQuery(baseOptions: Apollo.QueryHookOptions<MailingIndexPageReportByFormNumberQuery, MailingIndexPageReportByFormNumberQueryVariables> & ({ variables: MailingIndexPageReportByFormNumberQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailingIndexPageReportByFormNumberQuery, MailingIndexPageReportByFormNumberQueryVariables>(MailingIndexPageReportByFormNumberQueryDocument, options);
      }
export function useMailingIndexPageReportByFormNumberQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailingIndexPageReportByFormNumberQuery, MailingIndexPageReportByFormNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailingIndexPageReportByFormNumberQuery, MailingIndexPageReportByFormNumberQueryVariables>(MailingIndexPageReportByFormNumberQueryDocument, options);
        }
export function useMailingIndexPageReportByFormNumberQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MailingIndexPageReportByFormNumberQuery, MailingIndexPageReportByFormNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MailingIndexPageReportByFormNumberQuery, MailingIndexPageReportByFormNumberQueryVariables>(MailingIndexPageReportByFormNumberQueryDocument, options);
        }
export type MailingIndexPageReportByFormNumberQueryHookResult = ReturnType<typeof useMailingIndexPageReportByFormNumberQuery>;
export type MailingIndexPageReportByFormNumberQueryLazyQueryHookResult = ReturnType<typeof useMailingIndexPageReportByFormNumberQueryLazyQuery>;
export type MailingIndexPageReportByFormNumberQuerySuspenseQueryHookResult = ReturnType<typeof useMailingIndexPageReportByFormNumberQuerySuspenseQuery>;
export type MailingIndexPageReportByFormNumberQueryQueryResult = Apollo.QueryResult<MailingIndexPageReportByFormNumberQuery, MailingIndexPageReportByFormNumberQueryVariables>;
export const MailingIndexPageReportSendMutationDocument = gql`
    mutation MailingIndexPageReportSendMutation($input: ReportSendInput!) {
  reportSend(input: $input) {
    success
    error {
      message
    }
  }
}
    `;
export type MailingIndexPageReportSendMutationMutationFn = Apollo.MutationFunction<MailingIndexPageReportSendMutation, MailingIndexPageReportSendMutationVariables>;

/**
 * __useMailingIndexPageReportSendMutation__
 *
 * To run a mutation, you first call `useMailingIndexPageReportSendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMailingIndexPageReportSendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mailingIndexPageReportSendMutation, { data, loading, error }] = useMailingIndexPageReportSendMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMailingIndexPageReportSendMutation(baseOptions?: Apollo.MutationHookOptions<MailingIndexPageReportSendMutation, MailingIndexPageReportSendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MailingIndexPageReportSendMutation, MailingIndexPageReportSendMutationVariables>(MailingIndexPageReportSendMutationDocument, options);
      }
export type MailingIndexPageReportSendMutationHookResult = ReturnType<typeof useMailingIndexPageReportSendMutation>;
export type MailingIndexPageReportSendMutationMutationResult = Apollo.MutationResult<MailingIndexPageReportSendMutation>;
export type MailingIndexPageReportSendMutationMutationOptions = Apollo.BaseMutationOptions<MailingIndexPageReportSendMutation, MailingIndexPageReportSendMutationVariables>;