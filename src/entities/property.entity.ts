import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./address.entity";
import { Category } from "./category.entity";
import { Schedule } from "./schedules.entity";

@Entity("properties")
export class Property {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column()
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => Address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Schedule, (schedule) => schedule.property)
  schedules: Schedule[];

  @ManyToOne(() => Category, (category) => category.properties)
  category: Category;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
