import gql from 'graphql-tag'

export const BLOCKS_QUERY = gql`
  query getBlocks($skip: Int!, $take: Int!) {
    getBlocks(skip: $skip, take: $take) {
      hash
      number
      parentHash
      timestamp
      transactions {
        hash
      }
    }
  }
`

export const TRANSACTIONS_QUERY = gql`
  query getTransactions($skip: Int!, $take: Int!) {
    getTransactions(skip: $skip, take: $take) {
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
