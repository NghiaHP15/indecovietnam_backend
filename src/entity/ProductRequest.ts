import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Factory } from "./Factory";
import { Order } from "./Order";
import { ProductRequestStatus } from "../utils/enum";
import { ProductBatche } from "./ProductBatche";

@Entity()
export class ProductRequest {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    code!: string;

    @Column({ type: 'enum', enum: ProductRequestStatus, default: ProductRequestStatus.PENDING })
    status!: ProductRequestStatus;

    @Column({ type: 'date', nullable: true })
    requested_date!: Date;

    @Column({ type: 'date', nullable: true })
    due_date!: Date;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Factory, (factory) => factory.requests)
    factory!: Factory;

    @ManyToOne(() => Order, (order) => order.requests)
    order!: Order;

    @OneToMany(() => ProductBatche, (batche) => batche.request)
    batches!: ProductBatche[];
}