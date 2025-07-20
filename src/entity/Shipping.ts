import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShippingStatus } from "../utils/enum";
import { Shipper } from "./Shipper";
import { Order } from "./Order";
import { ShipmentDetail } from "./ShipmentDetail";

@Entity()
export class Shipping {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    code!: string;

    @Column({ type: 'enum', enum: ShippingStatus, default: ShippingStatus.PREPARING })
    status!: ShippingStatus;

    @Column({ type: 'date' })
    estimated_date!: Date;

    @Column({ type: 'date' })
    delevered_at!: Date;

    @Column({ type: 'varchar', length: 255 })
    note!: string;

    @ManyToOne(() => Shipper, (shipper) => shipper.shippings)
    shipper!: Shipper;

    @ManyToOne(() => Order, (order) => order.shippings)
    order!: Order;

    @OneToMany(() => ShipmentDetail, (detail) => detail.shipping)
    shipment_details!: ShipmentDetail[];
}