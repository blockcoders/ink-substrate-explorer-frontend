// THIS IS A GENERATED FILE, use `pnpm codegen` to regenerate
/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Block = {
  __typename?: 'Block';
  encodedLength: Scalars['Float'];
  hash: Scalars['String'];
  number: Scalars['Int'];
  parentHash: Scalars['String'];
  timestamp: Scalars['Float'];
  transactions: Array<Transaction>;
};

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String'];
  events: Array<Event>;
  metadata?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  data?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  index: Scalars['String'];
  method: Scalars['String'];
  section: Scalars['String'];
  timestamp: Scalars['Float'];
  topics: Scalars['String'];
  transactionHash?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  uploadMetadata: Scalars['Boolean'];
};


export type MutationUploadMetadataArgs = {
  contractAddress: Scalars['String'];
  metadata: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  decodeEvents: Scalars['String'];
  getBlock: Block;
  getBlocks: Array<Block>;
  getContract: Contract;
  getEvents: Array<Event>;
  getTransaction: Transaction;
  getTransactions: Array<Transaction>;
  getTransactionsByContract: Array<Transaction>;
  status: Scalars['String'];
};


export type QueryDecodeEventsArgs = {
  contractAddress: Scalars['String'];
};


export type QueryGetBlockArgs = {
  hash: Scalars['String'];
};


export type QueryGetBlocksArgs = {
  orderAsc?: InputMaybe<Scalars['Boolean']>;
  orderByNumber?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetContractArgs = {
  address: Scalars['String'];
};


export type QueryGetEventsArgs = {
  contract?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  transactionHash?: InputMaybe<Scalars['String']>;
};


export type QueryGetTransactionArgs = {
  hash: Scalars['String'];
};


export type QueryGetTransactionsArgs = {
  blockHash?: InputMaybe<Scalars['String']>;
  orderAsc?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTransactionsByContractArgs = {
  address: Scalars['String'];
  orderAsc?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  args?: Maybe<Scalars['String']>;
  blockHash?: Maybe<Scalars['String']>;
  callIndex?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['String']>;
  encodedLength?: Maybe<Scalars['Int']>;
  era?: Maybe<Scalars['String']>;
  events: Array<Event>;
  hash: Scalars['String'];
  method: Scalars['String'];
  nonce?: Maybe<Scalars['Int']>;
  section: Scalars['String'];
  signature: Scalars['String'];
  signer?: Maybe<Scalars['String']>;
  ss58?: Maybe<Scalars['String']>;
  timestamp: Scalars['Float'];
  tip?: Maybe<Scalars['Int']>;
  tokens?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['Int']>;
};

export type GetBlocksQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  orderByNumber?: InputMaybe<Scalars['Boolean']>;
  orderAsc?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetBlocksQuery = { __typename?: 'Query', getBlocks: Array<{ __typename?: 'Block', hash: string, number: number, parentHash: string, timestamp: number, encodedLength: number, transactions: Array<{ __typename?: 'Transaction', hash: string }> }> };

export type GetBlockQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type GetBlockQuery = { __typename?: 'Query', getBlock: { __typename?: 'Block', hash: string, number: number, parentHash: string, timestamp: number, encodedLength: number, transactions: Array<{ __typename?: 'Transaction', hash: string, timestamp: number, method: string, section: string, signature: string, nonce?: number | null }> } };

export type GetTransactionsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  orderAsc?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', blockHash?: string | null, hash: string, method: string, nonce?: number | null, section: string, signature: string, signer?: string | null, timestamp: number, tip?: number | null, events: Array<{ __typename?: 'Event', method: string, section: string }> }> };

export type GetTransactionQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type GetTransactionQuery = { __typename?: 'Query', getTransaction: { __typename?: 'Transaction', args?: string | null, blockHash?: string | null, callIndex?: string | null, decimals?: string | null, encodedLength?: number | null, era?: string | null, hash: string, method: string, nonce?: number | null, section: string, signature: string, signer?: string | null, ss58?: string | null, timestamp: number, tip?: number | null, tokens?: string | null, type?: number | null, version?: number | null } };

export type GetTransactionsByContractQueryVariables = Exact<{
  address: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  orderAsc?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetTransactionsByContractQuery = { __typename?: 'Query', getTransactionsByContract: Array<{ __typename?: 'Transaction', blockHash?: string | null, hash: string, method: string, nonce?: number | null, section: string, signature: string, signer?: string | null, timestamp: number, tip?: number | null, events: Array<{ __typename?: 'Event', method: string, section: string }> }> };


export const GetBlocksDocument = gql`
    query getBlocks($skip: Int!, $take: Int!, $orderByNumber: Boolean, $orderAsc: Boolean) {
  getBlocks(
    skip: $skip
    take: $take
    orderByNumber: $orderByNumber
    orderAsc: $orderAsc
  ) {
    hash
    number
    parentHash
    timestamp
    encodedLength
    transactions {
      hash
    }
  }
}
    `;

/**
 * __useGetBlocksQuery__
 *
 * To run a query within a React component, call `useGetBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlocksQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderByNumber: // value for 'orderByNumber'
 *      orderAsc: // value for 'orderAsc'
 *   },
 * });
 */
export function useGetBlocksQuery(baseOptions: Apollo.QueryHookOptions<GetBlocksQuery, GetBlocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlocksQuery, GetBlocksQueryVariables>(GetBlocksDocument, options);
      }
export function useGetBlocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlocksQuery, GetBlocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlocksQuery, GetBlocksQueryVariables>(GetBlocksDocument, options);
        }
export type GetBlocksQueryHookResult = ReturnType<typeof useGetBlocksQuery>;
export type GetBlocksLazyQueryHookResult = ReturnType<typeof useGetBlocksLazyQuery>;
export type GetBlocksQueryResult = Apollo.QueryResult<GetBlocksQuery, GetBlocksQueryVariables>;
export const GetBlockDocument = gql`
    query getBlock($hash: String!) {
  getBlock(hash: $hash) {
    hash
    number
    parentHash
    timestamp
    encodedLength
    transactions {
      hash
      timestamp
      method
      section
      signature
      nonce
    }
  }
}
    `;

/**
 * __useGetBlockQuery__
 *
 * To run a query within a React component, call `useGetBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlockQuery({
 *   variables: {
 *      hash: // value for 'hash'
 *   },
 * });
 */
export function useGetBlockQuery(baseOptions: Apollo.QueryHookOptions<GetBlockQuery, GetBlockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlockQuery, GetBlockQueryVariables>(GetBlockDocument, options);
      }
export function useGetBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlockQuery, GetBlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlockQuery, GetBlockQueryVariables>(GetBlockDocument, options);
        }
export type GetBlockQueryHookResult = ReturnType<typeof useGetBlockQuery>;
export type GetBlockLazyQueryHookResult = ReturnType<typeof useGetBlockLazyQuery>;
export type GetBlockQueryResult = Apollo.QueryResult<GetBlockQuery, GetBlockQueryVariables>;
export const GetTransactionsDocument = gql`
    query getTransactions($skip: Int!, $take: Int!, $orderAsc: Boolean) {
  getTransactions(skip: $skip, take: $take, orderAsc: $orderAsc) {
    blockHash
    events {
      method
      section
    }
    hash
    method
    nonce
    section
    signature
    signer
    timestamp
    tip
  }
}
    `;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderAsc: // value for 'orderAsc'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetTransactionDocument = gql`
    query getTransaction($hash: String!) {
  getTransaction(hash: $hash) {
    args
    blockHash
    callIndex
    decimals
    encodedLength
    era
    hash
    method
    nonce
    section
    signature
    signer
    ss58
    timestamp
    tip
    tokens
    type
    version
  }
}
    `;

/**
 * __useGetTransactionQuery__
 *
 * To run a query within a React component, call `useGetTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionQuery({
 *   variables: {
 *      hash: // value for 'hash'
 *   },
 * });
 */
export function useGetTransactionQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
      }
export function useGetTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
        }
export type GetTransactionQueryHookResult = ReturnType<typeof useGetTransactionQuery>;
export type GetTransactionLazyQueryHookResult = ReturnType<typeof useGetTransactionLazyQuery>;
export type GetTransactionQueryResult = Apollo.QueryResult<GetTransactionQuery, GetTransactionQueryVariables>;
export const GetTransactionsByContractDocument = gql`
    query getTransactionsByContract($address: String!, $skip: Int!, $take: Int!, $orderAsc: Boolean) {
  getTransactionsByContract(
    skip: $skip
    take: $take
    orderAsc: $orderAsc
    address: $address
  ) {
    blockHash
    events {
      method
      section
    }
    hash
    method
    nonce
    section
    signature
    signer
    timestamp
    tip
  }
}
    `;

/**
 * __useGetTransactionsByContractQuery__
 *
 * To run a query within a React component, call `useGetTransactionsByContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsByContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsByContractQuery({
 *   variables: {
 *      address: // value for 'address'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderAsc: // value for 'orderAsc'
 *   },
 * });
 */
export function useGetTransactionsByContractQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsByContractQuery, GetTransactionsByContractQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsByContractQuery, GetTransactionsByContractQueryVariables>(GetTransactionsByContractDocument, options);
      }
export function useGetTransactionsByContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsByContractQuery, GetTransactionsByContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsByContractQuery, GetTransactionsByContractQueryVariables>(GetTransactionsByContractDocument, options);
        }
export type GetTransactionsByContractQueryHookResult = ReturnType<typeof useGetTransactionsByContractQuery>;
export type GetTransactionsByContractLazyQueryHookResult = ReturnType<typeof useGetTransactionsByContractLazyQuery>;
export type GetTransactionsByContractQueryResult = Apollo.QueryResult<GetTransactionsByContractQuery, GetTransactionsByContractQueryVariables>;