import { ApolloServer } from "apollo-server";
import { productResolvers } from "./resolvers/productResolvers";
import { productTypeDefs } from "./schemas/productSchema";
import { AppDataSource } from "./data-source";
import { userTypeDefs } from "./schemas/userSchema";
import { userResolvers } from "./resolvers/userResolvers";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    const server = new ApolloServer({
      typeDefs: [userTypeDefs, productTypeDefs],
      resolvers: [userResolvers, productResolvers],
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
