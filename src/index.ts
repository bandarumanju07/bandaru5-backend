import { ApolloServer, gql } from "apollo-server";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => User.find(),
  },
  Mutation: {
    createUser: async (_: any, args: { name: string; email: string }) => {
      const user = new User();
      user.name = args.name;
      user.email = args.email;
      await user.save();
      return user;
    },
  },
};

AppDataSource.initialize().then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
