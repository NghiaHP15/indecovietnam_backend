import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Gender, Level, Provider } from "../utils/enum";
import { Address } from "./Address";
import { Order } from "./Order";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({ unique: true, length: 255 })
    email!: string;

    @Column({ type: 'varchar', length: 50 })
    firstname!: string;

    @Column({ type: 'varchar', length: 50 })
    lastname!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    password_hash?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone?: string;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.OTHER,
    })
    gender?: Gender;

    @Column({type: "date", nullable: true })
    date_of_birth?: Date;

    @Column({
        type: "enum",
        enum: Level,
        default: Level.SILVER
    })
    level?: Level;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    refresh_token?: string;

    @Column({
        type: "enum",
        enum: Provider,
        default: Provider.LOCAL,
    })
    provider?: Provider;

    @Column({ type: 'varchar', length: 255, nullable: true })
    provider_id?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @OneToMany(() => Address, (address) => address.customer, { nullable: true })
    addresses?: Address[];

    @OneToMany(() => Order, (order) => order.customer, { nullable: true })
    orders?: Order[]
}