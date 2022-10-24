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
  hasMetadata: Scalars['Boolean'];
  metadata?: Maybe<Scalars['String']>;
  queries: Array<ContractQuery>;
};

export type ContractQuery = {
  __typename?: 'ContractQuery';
  args: Array<Scalars['String']>;
  docs: Array<Scalars['String']>;
  method: Scalars['String'];
  name: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  data?: Maybe<Scalars['String']>;
  decodedData?: Maybe<Scalars['String']>;
  formattedData: Scalars['String'];
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
  decodeEvent: Scalars['String'];
  decodeEvents: Scalars['String'];
  executeQuery: QueryResult;
  uploadMetadata: Scalars['Boolean'];
};


export type MutationDecodeEventArgs = {
  contractAddress: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDecodeEventsArgs = {
  contract?: InputMaybe<Scalars['String']>;
  orderAsc?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  transactionHash?: InputMaybe<Scalars['String']>;
};


export type MutationExecuteQueryArgs = {
  address: Scalars['String'];
  args?: InputMaybe<QueryArgs>;
  method: Scalars['String'];
};


export type MutationUploadMetadataArgs = {
  contractAddress: Scalars['String'];
  metadata: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getBlock: Block;
  getBlocks: Array<Block>;
  getContract: Contract;
  getContractQueries: Contract;
  getContracts: Array<Contract>;
  getEvent: Event;
  getEvents: Array<Event>;
  getTransaction: Transaction;
  getTransactions: Array<Transaction>;
  getTransactionsByContract: Array<Transaction>;
  status: Scalars['String'];
  version: Scalars['String'];
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


export type QueryGetContractQueriesArgs = {
  address: Scalars['String'];
};


export type QueryGetContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetEventArgs = {
  id: Scalars['String'];
};


export type QueryGetEventsArgs = {
  contract?: InputMaybe<Scalars['String']>;
  orderAsc?: InputMaybe<Scalars['Boolean']>;
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

export type QueryArgs = {
  options: QueryOptions;
  sender: Scalars['String'];
  values?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryOptions = {
  gasLimit: Scalars['String'];
  storageLimit?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type QueryResult = {
  __typename?: 'QueryResult';
  debugMessage: Scalars['String'];
  gasConsumed: Scalars['String'];
  gasRequired: Scalars['String'];
  output: Scalars['String'];
  result: Scalars['String'];
  storageDeposit: Scalars['String'];
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
  blockHash?: InputMaybe<Scalars['String']>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', blockHash?: string | null, hash: string, method: string, nonce?: number | null, section: string, signature: string, signer?: string | null, timestamp: number, tip?: number | null, events: Array<{ __typename?: 'Event', method: string, section: string }> }> };

export type GetTransactionQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type GetTransactionQuery = { __typename?: 'Query', getTransaction: { __typename?: 'Transaction', args?: string | null, blockHash?: string | null, callIndex?: string | null, decimals?: string | null, encodedLength?: number | null, era?: string | null, hash: string, method: string, nonce?: number | null, section: string, signature: string, signer?: string | null, ss58?: string | null, timestamp: number, tip?: number | null, tokens?: string | null, type?: number | null, version?: number | null, events: Array<{ __typename?: 'Event', data?: string | null, decodedData?: string | null, formattedData: string, id: string, index: string, method: string, section: string, timestamp: number, topics: string, transactionHash?: string | null }> } };

export type GetTransactionsByContractQueryVariables = Exact<{
  address: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  orderAsc?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetTransactionsByContractQuery = { __typename?: 'Query', getTransactionsByContract: Array<{ __typename?: 'Transaction', blockHash?: string | null, hash: string, method: string, nonce?: number | null, section: string, signature: string, signer?: string | null, timestamp: number, tip?: number | null, events: Array<{ __typename?: 'Event', method: string, section: string }> }> };

export type GetTransactionsByBlockQueryVariables = Exact<{
  blockHash: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  orderAsc?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetTransactionsByBlockQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', blockHash?: string | null, hash: string, method: string, nonce?: number | null, section: string, signature: string, signer?: string | null, timestamp: number, tip?: number | null, events: Array<{ __typename?: 'Event', method: string, section: string }> }> };

export type GetEventsQueryVariables = Exact<{
  contract: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  orderAsc?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetEventsQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'Event', id: string, index: string, method: string, section: string, timestamp: number, transactionHash?: string | null }> };

export type GetEventQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent: { __typename?: 'Event', id: string, data?: string | null, decodedData?: string | null, formattedData: string, index: string, method: string, section: string, timestamp: number, topics: string, transactionHash?: string | null } };

export type GetLastBlockQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type GetLastBlockQuery = { __typename?: 'Query', getBlocks: Array<{ __typename?: 'Block', number: number, timestamp: number }> };

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: string };

export type GetContractQueriesQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type GetContractQueriesQuery = { __typename?: 'Query', getContractQueries: { __typename?: 'Contract', address: string, metadata?: string | null, queries: Array<{ __typename?: 'ContractQuery', method: string, docs: Array<string>, args: Array<string>, name: string }> } };

export type UploadMetadataMutationVariables = Exact<{
  contractAddress: Scalars['String'];
  metadata: Scalars['String'];
}>;


export type UploadMetadataMutation = { __typename?: 'Mutation', uploadMetadata: boolean };

export type ExecuteQueryMutationVariables = Exact<{
  address: Scalars['String'];
  args: QueryArgs;
  method: Scalars['String'];
}>;


export type ExecuteQueryMutation = { __typename?: 'Mutation', executeQuery: { __typename?: 'QueryResult', debugMessage: string, gasConsumed: string, gasRequired: string, output: string, result: string, storageDeposit: string } };

export type GetContractsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type GetContractsQuery = { __typename?: 'Query', getContracts: Array<{ __typename?: 'Contract', hasMetadata: boolean, address: string, events: Array<{ __typename?: 'Event', id: string, timestamp: number }> }> };

export type DecodeEventMutationVariables = Exact<{
  contractAddress: Scalars['String'];
  id: Scalars['String'];
}>;


export type DecodeEventMutation = { __typename?: 'Mutation', decodeEvent: string };


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
    query getTransactions($skip: Int!, $take: Int!, $orderAsc: Boolean, $blockHash: String) {
  getTransactions(
    skip: $skip
    take: $take
    orderAsc: $orderAsc
    blockHash: $blockHash
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
 *      blockHash: // value for 'blockHash'
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
    events {
      data
      decodedData
      formattedData
      id
      index
      method
      section
      timestamp
      topics
      transactionHash
    }
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
export const GetTransactionsByBlockDocument = gql`
    query getTransactionsByBlock($blockHash: String!, $skip: Int!, $take: Int!, $orderAsc: Boolean) {
  getTransactions(
    skip: $skip
    take: $take
    orderAsc: $orderAsc
    blockHash: $blockHash
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
 * __useGetTransactionsByBlockQuery__
 *
 * To run a query within a React component, call `useGetTransactionsByBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsByBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsByBlockQuery({
 *   variables: {
 *      blockHash: // value for 'blockHash'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderAsc: // value for 'orderAsc'
 *   },
 * });
 */
export function useGetTransactionsByBlockQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsByBlockQuery, GetTransactionsByBlockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsByBlockQuery, GetTransactionsByBlockQueryVariables>(GetTransactionsByBlockDocument, options);
      }
export function useGetTransactionsByBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsByBlockQuery, GetTransactionsByBlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsByBlockQuery, GetTransactionsByBlockQueryVariables>(GetTransactionsByBlockDocument, options);
        }
export type GetTransactionsByBlockQueryHookResult = ReturnType<typeof useGetTransactionsByBlockQuery>;
export type GetTransactionsByBlockLazyQueryHookResult = ReturnType<typeof useGetTransactionsByBlockLazyQuery>;
export type GetTransactionsByBlockQueryResult = Apollo.QueryResult<GetTransactionsByBlockQuery, GetTransactionsByBlockQueryVariables>;
export const GetEventsDocument = gql`
    query getEvents($contract: String!, $skip: Int!, $take: Int!, $orderAsc: Boolean) {
  getEvents(skip: $skip, take: $take, orderAsc: $orderAsc, contract: $contract) {
    id
    index
    method
    section
    timestamp
    transactionHash
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      contract: // value for 'contract'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderAsc: // value for 'orderAsc'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventDocument = gql`
    query getEvent($id: String!) {
  getEvent(id: $id) {
    id
    data
    decodedData
    formattedData
    index
    method
    section
    timestamp
    topics
    transactionHash
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetLastBlockDocument = gql`
    query getLastBlock($skip: Int!, $take: Int!) {
  getBlocks(skip: $skip, take: $take) {
    number
    timestamp
  }
}
    `;

/**
 * __useGetLastBlockQuery__
 *
 * To run a query within a React component, call `useGetLastBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastBlockQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetLastBlockQuery(baseOptions: Apollo.QueryHookOptions<GetLastBlockQuery, GetLastBlockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastBlockQuery, GetLastBlockQueryVariables>(GetLastBlockDocument, options);
      }
export function useGetLastBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastBlockQuery, GetLastBlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastBlockQuery, GetLastBlockQueryVariables>(GetLastBlockDocument, options);
        }
export type GetLastBlockQueryHookResult = ReturnType<typeof useGetLastBlockQuery>;
export type GetLastBlockLazyQueryHookResult = ReturnType<typeof useGetLastBlockLazyQuery>;
export type GetLastBlockQueryResult = Apollo.QueryResult<GetLastBlockQuery, GetLastBlockQueryVariables>;
export const VersionDocument = gql`
    query version {
  version
}
    `;

/**
 * __useVersionQuery__
 *
 * To run a query within a React component, call `useVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useVersionQuery(baseOptions?: Apollo.QueryHookOptions<VersionQuery, VersionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VersionQuery, VersionQueryVariables>(VersionDocument, options);
      }
export function useVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VersionQuery, VersionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VersionQuery, VersionQueryVariables>(VersionDocument, options);
        }
export type VersionQueryHookResult = ReturnType<typeof useVersionQuery>;
export type VersionLazyQueryHookResult = ReturnType<typeof useVersionLazyQuery>;
export type VersionQueryResult = Apollo.QueryResult<VersionQuery, VersionQueryVariables>;
export const GetContractQueriesDocument = gql`
    query getContractQueries($address: String!) {
  getContractQueries(address: $address) {
    address
    metadata
    queries {
      method
      docs
      args
      name
    }
  }
}
    `;

/**
 * __useGetContractQueriesQuery__
 *
 * To run a query within a React component, call `useGetContractQueriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractQueriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractQueriesQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetContractQueriesQuery(baseOptions: Apollo.QueryHookOptions<GetContractQueriesQuery, GetContractQueriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractQueriesQuery, GetContractQueriesQueryVariables>(GetContractQueriesDocument, options);
      }
export function useGetContractQueriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractQueriesQuery, GetContractQueriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractQueriesQuery, GetContractQueriesQueryVariables>(GetContractQueriesDocument, options);
        }
export type GetContractQueriesQueryHookResult = ReturnType<typeof useGetContractQueriesQuery>;
export type GetContractQueriesLazyQueryHookResult = ReturnType<typeof useGetContractQueriesLazyQuery>;
export type GetContractQueriesQueryResult = Apollo.QueryResult<GetContractQueriesQuery, GetContractQueriesQueryVariables>;
export const UploadMetadataDocument = gql`
    mutation uploadMetadata($contractAddress: String!, $metadata: String!) {
  uploadMetadata(contractAddress: $contractAddress, metadata: $metadata)
}
    `;
export type UploadMetadataMutationFn = Apollo.MutationFunction<UploadMetadataMutation, UploadMetadataMutationVariables>;

/**
 * __useUploadMetadataMutation__
 *
 * To run a mutation, you first call `useUploadMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMetadataMutation, { data, loading, error }] = useUploadMetadataMutation({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      metadata: // value for 'metadata'
 *   },
 * });
 */
export function useUploadMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UploadMetadataMutation, UploadMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadMetadataMutation, UploadMetadataMutationVariables>(UploadMetadataDocument, options);
      }
export type UploadMetadataMutationHookResult = ReturnType<typeof useUploadMetadataMutation>;
export type UploadMetadataMutationResult = Apollo.MutationResult<UploadMetadataMutation>;
export type UploadMetadataMutationOptions = Apollo.BaseMutationOptions<UploadMetadataMutation, UploadMetadataMutationVariables>;
export const ExecuteQueryDocument = gql`
    mutation executeQuery($address: String!, $args: QueryArgs!, $method: String!) {
  executeQuery(address: $address, args: $args, method: $method) {
    debugMessage
    gasConsumed
    gasRequired
    output
    result
    storageDeposit
  }
}
    `;
export type ExecuteQueryMutationFn = Apollo.MutationFunction<ExecuteQueryMutation, ExecuteQueryMutationVariables>;

/**
 * __useExecuteQueryMutation__
 *
 * To run a mutation, you first call `useExecuteQueryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteQueryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeQueryMutation, { data, loading, error }] = useExecuteQueryMutation({
 *   variables: {
 *      address: // value for 'address'
 *      args: // value for 'args'
 *      method: // value for 'method'
 *   },
 * });
 */
export function useExecuteQueryMutation(baseOptions?: Apollo.MutationHookOptions<ExecuteQueryMutation, ExecuteQueryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExecuteQueryMutation, ExecuteQueryMutationVariables>(ExecuteQueryDocument, options);
      }
export type ExecuteQueryMutationHookResult = ReturnType<typeof useExecuteQueryMutation>;
export type ExecuteQueryMutationResult = Apollo.MutationResult<ExecuteQueryMutation>;
export type ExecuteQueryMutationOptions = Apollo.BaseMutationOptions<ExecuteQueryMutation, ExecuteQueryMutationVariables>;
export const GetContractsDocument = gql`
    query getContracts($skip: Int!, $take: Int!) {
  getContracts(skip: $skip, take: $take) {
    hasMetadata
    address
    events {
      id
      timestamp
    }
  }
}
    `;

/**
 * __useGetContractsQuery__
 *
 * To run a query within a React component, call `useGetContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetContractsQuery(baseOptions: Apollo.QueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
      }
export function useGetContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export type GetContractsQueryHookResult = ReturnType<typeof useGetContractsQuery>;
export type GetContractsLazyQueryHookResult = ReturnType<typeof useGetContractsLazyQuery>;
export type GetContractsQueryResult = Apollo.QueryResult<GetContractsQuery, GetContractsQueryVariables>;
export const DecodeEventDocument = gql`
    mutation decodeEvent($contractAddress: String!, $id: String!) {
  decodeEvent(contractAddress: $contractAddress, id: $id)
}
    `;
export type DecodeEventMutationFn = Apollo.MutationFunction<DecodeEventMutation, DecodeEventMutationVariables>;

/**
 * __useDecodeEventMutation__
 *
 * To run a mutation, you first call `useDecodeEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecodeEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decodeEventMutation, { data, loading, error }] = useDecodeEventMutation({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDecodeEventMutation(baseOptions?: Apollo.MutationHookOptions<DecodeEventMutation, DecodeEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecodeEventMutation, DecodeEventMutationVariables>(DecodeEventDocument, options);
      }
export type DecodeEventMutationHookResult = ReturnType<typeof useDecodeEventMutation>;
export type DecodeEventMutationResult = Apollo.MutationResult<DecodeEventMutation>;
export type DecodeEventMutationOptions = Apollo.BaseMutationOptions<DecodeEventMutation, DecodeEventMutationVariables>;