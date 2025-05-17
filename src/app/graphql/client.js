import { ApolloClient, InMemoryCache} from "@apollo/client";

const graphqlClient = new ApolloClient({
  uri: "https://project-backend.online/graphql",
  cache: new InMemoryCache(),
});

export default graphqlClient;