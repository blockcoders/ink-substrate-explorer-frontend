import gql from 'graphql-tag'

export const BLOCKS_QUERY = gql`
  query getBlocks($skip: Int!, $take: Int!) {
    getBlocks(skip: $skip, take: $take) {
      hash
      number
      parentHash
      transactions {
        hash
      }
    }
  }
`
