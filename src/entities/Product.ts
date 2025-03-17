// src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column("decimal")
  price!: number;

  @Column()
  sku!: string; // Stock Keeping Unit

  @Column({ nullable: true })
  categoryId!: number; // Foreign Key to Category Table (if applicable)

  @Column({ nullable: true })
  inventoryId!: number; // Foreign Key to Inventory Table (if applicable)

  @Column({ nullable: true })
  discountId!: number; // Foreign Key to Discount Table (if applicable)

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  modifiedAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt!: Date; // Soft delete timestamp

  @Column({ nullable: true })
  imageUrl!: string;
}
