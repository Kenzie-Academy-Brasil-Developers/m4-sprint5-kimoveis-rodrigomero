import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    Timestamp,
} from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";

@Entity("schedules_users_properties")
export class Schedule {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column()
    date: string;

    @Column()
    hour: string;

    @ManyToOne((type) => Property, (property) => property.schedules)
    property: Property;

    @ManyToOne((type) => User, (user) => user.schedules)
    user: User;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
