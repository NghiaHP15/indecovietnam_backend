import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { ProductVariant } from "./ProductVariant";
import { WarehouseImport } from "./WarehouseImport";
import { Warehouse } from "./Warehouse";
import { ProductBatche } from "./ProductBatche";
import { ShipmentDetail } from "./ShipmentDetail";

@Entity()
export class InventoryItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({  type: 'varchar', length: 20, unique: true })
    code!: string;

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'int' })
    available_quantity!: number;

    @Column({  type: 'varchar', length: 255 })
    location!: string;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;

    // @ManyToOne(() => ProductVariant, (variant) => variant.inventory_items)
    // product_variant!: ProductVariant;

    @ManyToOne(() => ProductBatche, (batche) => batche.inventory_items)
    batche!: ProductBatche;

    @ManyToOne(() => WarehouseImport, (imported) => imported.items)
    import!: WarehouseImport;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventory_items)
    warehouse!: Warehouse;

    @OneToMany(() => ShipmentDetail, (detail) => detail.item)
    shipment_details!: ShipmentDetail[];
}