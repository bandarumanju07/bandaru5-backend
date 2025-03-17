import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    gender: String
    phone: String
    city: String
    state: String
    country: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    gender: String
    phone: String
    city: String
    state: String
    country: String
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    gender: String
    phone: String
    city: String
    state: String
    country: String
  }
`;
