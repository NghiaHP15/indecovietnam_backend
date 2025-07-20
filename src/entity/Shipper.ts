import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShipperType } from "../utils/enum";
import { Shipping } from "./Shipping";

@Entity()
export class Shipper {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 20 })
    contact!: string;

    @Column({ type: 'enum', enum: ShipperType, default: ShipperType.INTERNAL })
    type!: ShipperType;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;

    @OneToMany(() => Shipping, shipping => shipping.shipper)
    shippings!: Shipping[];
}