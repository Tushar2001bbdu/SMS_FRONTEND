import { ApolloClient, InMemoryCache} from "@apollo/client";

const graphqlClient = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export default graphqlClient;