import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Board } from "../board/board.entity";

@Entity()
export class List {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150 })
  title!: string;

  @ManyToOne(() => Board, {
    onDelete: "CASCADE",
  })
  board!: Board;

  @Column({ type: "float", default: 0 })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
