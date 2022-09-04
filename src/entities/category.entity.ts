import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Property } from "./property.entity";

@Entity("categories")
export class Category {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Property, (property) => property.category)
  properties: Property[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
