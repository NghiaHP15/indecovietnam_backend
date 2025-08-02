import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../utils/enum";
import { Customer } from "./Customer";
import { OrderDetail } from "./OrderDetail";
import { ProductRequest } from "./ProductRequest";
import { Shipping } from "./Shipping";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    txnRef!: string;

    @Column({ type: 'timestamp' })
    order_date!: Date;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
    status!: OrderStatus;

    @Column({ type: 'decimal' })
    total_amount!: number;
    
    @Column({ type: "enum", enum: PaymentMethod, default: PaymentMethod.VNPAY })
    paymentmethod!: PaymentMethod;

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
    payment_status!: PaymentStatus;

    @Column({ type: 'varchar', length: 255 })
    note!: string;

    @Column({ type: 'varchar', length: 255 })
    address!: string;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer!: Customer

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    products!: OrderDetail[];

    @OneToMany(() => ProductRequest, (request) => request.order)
    requests!: ProductRequest[]

    @OneToMany(() => Shipping, (shipping) => shipping.order)
    shippings!: Shipping[];
}