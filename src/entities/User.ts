import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  gender!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  state!: string;

  @Column({ nullable: true })
  country!: string;
}
