import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Order } from "./Order";

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    receiver_name!: string;

    @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
    phone?: string;

    @Column({ type: 'varchar', length: 255 })
    address_line!: string;

    @Column({ type: 'varchar', length: 255 })
    ward!: string;

    @Column({ type: 'varchar', length: 255 })
    district!: string;

    @Column({ type: 'varchar', length: 255 })
    city!: string;

    @Column({type: 'boolean', default: false})
    default!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Customer, (customer) => customer.addresses)
    customer!: Customer;

    @OneToMany(() => Order, (order) => order.address)
    orders!: Order[];
}