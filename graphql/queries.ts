import gql from 'graphql-tag'

export const BLOCKS_QUERY = gql`
  query getBlocks($skip: Int!, $take: Int!, $orderByNumber: Boolean, $orderAsc: Boolean) {
    getBlocks(skip: $skip, take: $take, orderByNumber: $orderByNumber, orderAsc: $orderAsc) {
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
`

export const BLOCK_QUERY = gql`
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
`

export const TRANSACTIONS_QUERY = gql`
  query getTransactions($skip: Int!, $take: Int!, $orderAsc: Boolean, $blockHash: String) {
    getTransactions(skip: $skip, take: $take, orderAsc: $orderAsc, blockHash: $blockHash) {
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
`

export const TRANSACTION_QUERY = gql`
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
`
export const TRANSACTIONS_BY_CONTRACT_QUERY = gql`
  query getTransactionsByContract($address: String!, $skip: Int!, $take: Int!, $orderAsc: Boolean) {
    getTransactionsByContract(skip: $skip, take: $take, orderAsc: $orderAsc, address: $address) {
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
`
export const TRANSACTIONS_BY_BLOCK_QUERY = gql`
  query getTransactionsByBlock($blockHash: String!, $skip: Int!, $take: Int!, $orderAsc: Boolean) {
    getTransactions(skip: $skip, take: $take, orderAsc: $orderAsc, blockHash: $blockHash) {
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
`

export const EVENTS_QUERY = gql`
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
`

export const EVENT_QUERY = gql`
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
`
export const GET_LAST_BLOCK_QUERY = gql`
  query getLastBlock($skip: Int!, $take: Int!) {
    getBlocks(skip: $skip, take: $take) {
      number
      timestamp
    }
  }
`

export const GET_VERSION_QUERY = gql`
  query version {
    version
  }
`
export const GET_CONTRACT_QUERIES = gql`
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
`
export const UPLOAD_ABI_MUTATION = gql`
  mutation uploadMetadata($contractAddress: String!, $metadata: String!) {
    uploadMetadata(contractAddress: $contractAddress, metadata: $metadata)
  }
`
export const EXECUTE_QUERY_MUTATION = gql`
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
`
export const GET_CONTRACTS_QUERY = gql`
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
`
export const DECODE_EVENT_MUTATION = gql`
  mutation decodeEvent($contractAddress: String!, $id: String!) {
    decodeEvent(contractAddress: $contractAddress, id: $id)
  }
`
