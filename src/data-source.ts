import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product"; // ✅ Import Product entity

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "bandaru5",
  synchronize: true,
  entities: [User, Product], // ✅ Add Product entity here
  logging: true,
});
