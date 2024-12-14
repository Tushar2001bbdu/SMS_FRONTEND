import { ApolloClient, InMemoryCache} from "@apollo/client";

const graphqlClient = new ApolloClient({
  uri: "http://localhost:3004/",
  cache: new InMemoryCache(),
});

export default graphqlClient;