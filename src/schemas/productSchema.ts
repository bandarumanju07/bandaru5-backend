// src/schemas/productSchema.ts
import { gql } from "apollo-server";

export const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    sku: String!
    categoryId: Int
    inventoryId: Int
    discountId: Int
    createdAt: String!
    modifiedAt: String!
    deletedAt: String
    imageUrl: String
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    deleteProduct(id: ID!): Boolean
  }

  input CreateProductInput {
    name: String!
    description: String!
    price: Float!
    sku: String!
    categoryId: Int
    inventoryId: Int
    discountId: Int
    imageUrl: String
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Float
    sku: String
    categoryId: Int
    inventoryId: Int
    discountId: Int
    imageUrl: String
  }
`;
