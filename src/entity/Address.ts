import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    receiver_name!: string;

    @Column({ type: 'varchar', length: 255 })
    address_line!: string;

    @Column({ type: 'varchar', length: 255 })
    ward!: string;

    @Column({ type: 'varchar', length: 255 })
    district!: string;

    @Column({ type: 'varchar', length: 255 })
    city!: string;

    @Column()
    default!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Customer, (customer) => customer.addresses)
    customer!: Customer;
}