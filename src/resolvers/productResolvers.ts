// src/resolvers/productResolvers.ts
import { Product } from "../entities/Product";
import { GraphQLError } from "graphql";

export const productResolvers = {
  Query: {
    products: async () => {
      try {
        return await Product.find();
      } catch (error) {
        throw new GraphQLError("Failed to fetch products.", {
          extensions: { code: "INTERNAL_SERVER_ERROR", cause: error },
        });
      }
    },
    product: async (_: any, { id }: { id: number }) => {
      try {
        const product = await Product.findOneBy({ id });
        if (!product) {
          throw new GraphQLError(`Product with ID ${id} not found.`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return product;
      } catch (error) {
        throw new GraphQLError("Failed to fetch product.", {
          extensions: { code: "INTERNAL_SERVER_ERROR", cause: error },
        });
      }
    },
  },
  Mutation: {
    createProduct: async (_: any, { input }: { input: Partial<Product> }) => {
      try {
        const { name, description, price, sku } = input;

        if (!name || !description || !price || !sku) {
          throw new GraphQLError(
            "Missing required fields: name, description, price, or sku.",
            {
              extensions: { code: "BAD_USER_INPUT" },
            }
          );
        }

        const product = Product.create(input);
        await product.save();
        return product;
      } catch (error) {
        console.error("Error creating product:", error);
        throw new GraphQLError("Failed to create product.", {
          extensions: { code: "BAD_USER_INPUT", cause: error },
        });
      }
    },
    updateProduct: async (
      _: any,
      { id, input }: { id: number; input: Partial<Product> }
    ) => {
      try {
        const existingProduct = await Product.findOneBy({ id });
        if (!existingProduct) {
          throw new GraphQLError(`Product with ID ${id} not found.`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        await Product.update({ id }, input);
        return await Product.findOneBy({ id });
      } catch (error) {
        throw new GraphQLError("Failed to update product.", {
          extensions: { code: "INTERNAL_SERVER_ERROR", cause: error },
        });
      }
    },
    deleteProduct: async (_: any, { id }: { id: number }) => {
      try {
        const result = await Product.delete(id);
        if (result.affected === 0) {
          throw new GraphQLError(`Product with ID ${id} not found.`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return true;
      } catch (error) {
        throw new GraphQLError("Failed to delete product.", {
          extensions: { code: "INTERNAL_SERVER_ERROR", cause: error },
        });
      }
    },
  },
};
