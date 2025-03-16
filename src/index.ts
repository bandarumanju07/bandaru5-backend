import { ApolloServer } from "apollo-server";
import { AppDataSource } from "./data-source";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

AppDataSource.initialize().then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
