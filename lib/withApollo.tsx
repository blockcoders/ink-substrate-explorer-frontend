import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import nextWithApollo from 'next-with-apollo'
import { useRouter } from 'next/router'
const SCHEMA_URL = process.env.SCHEMA_URL || 'http://localhost:5000/graphql'

const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
        uri: SCHEMA_URL,
      }),
      headers: {
        ...(headers as Record<string, string>),
      },
      cache: new InMemoryCache().restore(initialState || {}),
    })
  },
  {
    render: ({ Page, props }) => {
      const router = useRouter()
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      )
    },
  },
)

export default withApollo
