import { ApolloClient, InMemoryCache} from "@apollo/client";

const graphqlClient = new ApolloClient({
  uri: "http://43.204.234.139:3001/graphql",
  cache: new InMemoryCache(),
});

export default graphqlClient;