import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workspace } from "../workspace/workspace.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150 })
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => Workspace, {
    onDelete: "CASCADE",
  })
  workspace!: Workspace;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
