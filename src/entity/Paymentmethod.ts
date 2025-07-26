import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Paymentmethod {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;

    @Column({ type: 'varchar', length: 255 })
    description!: string;

    @Column({ type: 'boolean', default: false })
    active!: boolean;

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @OneToMany(() => Order, order => order.paymentmethod)
    orders!: Order[]
}