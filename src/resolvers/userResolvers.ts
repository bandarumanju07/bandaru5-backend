import { User } from "../entities/User";
import { GraphQLError } from "graphql";

export const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new GraphQLError("Failed to fetch users.", {
          extensions: { code: "INTERNAL_SERVER_ERROR", cause: error },
        });
      }
    },
    user: async (_: any, { id }: { id: number }) => {
      try {
        const user = await User.findOneBy({ id });
        if (!user) {
          throw new GraphQLError(`User with ID ${id} not found.`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return user;
      } catch (error) {
        throw new GraphQLError("Failed to fetch user.", {
          extensions: { code: "INTERNAL_SERVER_ERROR", cause: error },
        });
      }
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: Partial<User> }) => {
      try {
        const user = User.create(input);
        await user.save();
        return user;
      } catch (error) {
        throw new GraphQLError("Failed to create user.", {
          extensions: { code: "BAD_USER_INPUT", cause: error },
        });
      }
    },
    updateUser: async (
      _: any,
      { id, input }: { id: number; input: Partial<User> }
    ) => {
      try {
        const existingUser = await User.findOneBy({ id });
        if (!existingUser) {
          throw new GraphQLError(`User with ID ${id} not found.`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        await User.update({ id }, input);
        return await User.findOneBy({ id });
      } catch (error) {
        throw new GraphQLError("Failed to update user.", {
          extensions: { code: "INTERNAL_SERVER_ERROR", cause: error },
        });
      }
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      try {
        const result = await User.delete(id);
        if (result.affected === 0) {
          throw new GraphQLError(`User with ID ${id} not found.`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return true;
      } catch (error) {
        throw new GraphQLError("Failed to delete user.", {
          extensions: { code: "INTERNAL_SERVER_ERROR", cause: error },
        });
      }
    },
  },
};
