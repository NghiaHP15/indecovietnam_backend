import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InventoryItem } from "./InventoryItem";
import { ProductVariant } from "./ProductVariant";
import { Shipping } from "./Shipping";

@Entity()
export class ShipmentDetail {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'int' })
    quantity!: number;

    @ManyToOne(() => InventoryItem, (item) => item.shipment_details)
    item!: InventoryItem;

    @ManyToOne(() => ProductVariant, (variant) => variant.shipment_details)
    variant!: ProductVariant;

    @ManyToOne(() => Shipping, (shipping) => shipping.shipment_details)
    shipping!: Shipping;
}