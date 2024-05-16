import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResultUpdatePageOilTypeIndicatorFragment = { __typename?: 'OilTypeIndicator', id: number, name: string, ntd: string, units: string };

export type ResultUpdatePageOilTypeResearchFragment = { __typename?: 'OilTypeResearch', id: number, name: string };

export type ResultUpdatePageFragment = { __typename?: 'Result', id: number, formNumber: string, interpretation?: string | null, oilType: { __typename?: 'OilType', id: number, name: string, standard: boolean, researches: Array<{ __typename?: 'OilTypeResearch', id: number, name: string } | null>, indicators: Array<{ __typename?: 'OilTypeIndicator', id: number, name: string, ntd: string, units: string } | null> }, indicators: Array<{ __typename?: 'ResultIndicator', id: number, value?: string | null, color?: Types.ResultIndicatorColor | null, oilTypeIndicator: { __typename?: 'OilTypeIndicator', id: number } }>, researches: Array<{ __typename?: 'ResultResearch', id: number, value?: string | null, color?: Types.ResultResearchColor | null, oilTypeResearch: { __typename?: 'OilTypeResearch', id: number } }> };

export type ResultUpdatePageQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type ResultUpdatePageQuery = { __typename?: 'Query', result?: { __typename?: 'Result', id: number, formNumber: string, interpretation?: string | null, oilType: { __typename?: 'OilType', id: number, name: string, standard: boolean, researches: Array<{ __typename?: 'OilTypeResearch', id: number, name: string } | null>, indicators: Array<{ __typename?: 'OilTypeIndicator', id: number, name: string, ntd: string, units: string } | null> }, indicators: Array<{ __typename?: 'ResultIndicator', id: number, value?: string | null, color?: Types.ResultIndicatorColor | null, oilTypeIndicator: { __typename?: 'OilTypeIndicator', id: number } }>, researches: Array<{ __typename?: 'ResultResearch', id: number, value?: string | null, color?: Types.ResultResearchColor | null, oilTypeResearch: { __typename?: 'OilTypeResearch', id: number } }> } | null };

export type ResultUpdatePageMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  input: Types.ResultUpdateInput;
}>;


export type ResultUpdatePageMutation = { __typename?: 'Mutation', resultUpdate: { __typename?: 'ResultUpdateResponse', success: boolean, error?: { __typename?: 'AuthenticationError', message: string } | { __typename?: 'NotAllowedError', message: string } | { __typename?: 'NotFoundError', message: string } | { __typename?: 'ValidationError', message: string } | null, record?: { __typename?: 'Result', id: number, formNumber: string, interpretation?: string | null, oilType: { __typename?: 'OilType', id: number, name: string, standard: boolean, researches: Array<{ __typename?: 'OilTypeResearch', id: number, name: string } | null>, indicators: Array<{ __typename?: 'OilTypeIndicator', id: number, name: string, ntd: string, units: string } | null> }, indicators: Array<{ __typename?: 'ResultIndicator', id: number, value?: string | null, color?: Types.ResultIndicatorColor | null, oilTypeIndicator: { __typename?: 'OilTypeIndicator', id: number } }>, researches: Array<{ __typename?: 'ResultResearch', id: number, value?: string | null, color?: Types.ResultResearchColor | null, oilTypeResearch: { __typename?: 'OilTypeResearch', id: number } }> } | null } };

export const ResultUpdatePageOilTypeResearchFragmentDoc = gql`
    fragment ResultUpdatePageOilTypeResearchFragment on OilTypeResearch {
  id
  name
}
    `;
export const ResultUpdatePageOilTypeIndicatorFragmentDoc = gql`
    fragment ResultUpdatePageOilTypeIndicatorFragment on OilTypeIndicator {
  id
  name
  ntd
  units
}
    `;
export const ResultUpdatePageFragmentDoc = gql`
    fragment ResultUpdatePageFragment on Result {
  id
  formNumber
  interpretation
  oilType {
    id
    name
    standard
    researches {
      ...ResultUpdatePageOilTypeResearchFragment
    }
    indicators {
      ...ResultUpdatePageOilTypeIndicatorFragment
    }
  }
  indicators {
    id
    value
    color
    oilTypeIndicator {
      id
    }
  }
  researches {
    id
    value
    color
    oilTypeResearch {
      id
    }
  }
}
    ${ResultUpdatePageOilTypeResearchFragmentDoc}
${ResultUpdatePageOilTypeIndicatorFragmentDoc}`;
export const ResultUpdatePageQueryDocument = gql`
    query ResultUpdatePageQuery($id: Int!) {
  result(id: $id) {
    ...ResultUpdatePageFragment
  }
}
    ${ResultUpdatePageFragmentDoc}`;

/**
 * __useResultUpdatePageQuery__
 *
 * To run a query within a React component, call `useResultUpdatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useResultUpdatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResultUpdatePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResultUpdatePageQuery(baseOptions: Apollo.QueryHookOptions<ResultUpdatePageQuery, ResultUpdatePageQueryVariables> & ({ variables: ResultUpdatePageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResultUpdatePageQuery, ResultUpdatePageQueryVariables>(ResultUpdatePageQueryDocument, options);
      }
export function useResultUpdatePageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResultUpdatePageQuery, ResultUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResultUpdatePageQuery, ResultUpdatePageQueryVariables>(ResultUpdatePageQueryDocument, options);
        }
export function useResultUpdatePageQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ResultUpdatePageQuery, ResultUpdatePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ResultUpdatePageQuery, ResultUpdatePageQueryVariables>(ResultUpdatePageQueryDocument, options);
        }
export type ResultUpdatePageQueryHookResult = ReturnType<typeof useResultUpdatePageQuery>;
export type ResultUpdatePageQueryLazyQueryHookResult = ReturnType<typeof useResultUpdatePageQueryLazyQuery>;
export type ResultUpdatePageQuerySuspenseQueryHookResult = ReturnType<typeof useResultUpdatePageQuerySuspenseQuery>;
export type ResultUpdatePageQueryQueryResult = Apollo.QueryResult<ResultUpdatePageQuery, ResultUpdatePageQueryVariables>;
export const ResultUpdatePageMutationDocument = gql`
    mutation ResultUpdatePageMutation($id: Int!, $input: ResultUpdateInput!) {
  resultUpdate(id: $id, input: $input) {
    success
    error {
      message
    }
    record {
      ...ResultUpdatePageFragment
    }
  }
}
    ${ResultUpdatePageFragmentDoc}`;
export type ResultUpdatePageMutationMutationFn = Apollo.MutationFunction<ResultUpdatePageMutation, ResultUpdatePageMutationVariables>;

/**
 * __useResultUpdatePageMutation__
 *
 * To run a mutation, you first call `useResultUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResultUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resultUpdatePageMutation, { data, loading, error }] = useResultUpdatePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResultUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<ResultUpdatePageMutation, ResultUpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResultUpdatePageMutation, ResultUpdatePageMutationVariables>(ResultUpdatePageMutationDocument, options);
      }
export type ResultUpdatePageMutationHookResult = ReturnType<typeof useResultUpdatePageMutation>;
export type ResultUpdatePageMutationMutationResult = Apollo.MutationResult<ResultUpdatePageMutation>;
export type ResultUpdatePageMutationMutationOptions = Apollo.BaseMutationOptions<ResultUpdatePageMutation, ResultUpdatePageMutationVariables>;