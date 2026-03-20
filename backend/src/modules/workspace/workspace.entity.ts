import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150 })
  name!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  owner!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
