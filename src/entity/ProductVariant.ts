import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { OrderDetail } from "./OrderDetail";
import { ProductBatche } from "./ProductBatche";
// import { InventoryItem } from "./InventoryItem";
import { ShipmentDetail } from "./ShipmentDetail";
import { Color } from "./Color";
import { generateSku } from "../config/contant";

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    sku!: string;

    @Column({ type: 'varchar', length: 50 })
    size!: string;
    
    @Column({ type: 'varchar', length: 255,  nullable: true })
    image?: string;

    @Column({ type: 'varchar', length: 255 })
    price!: string

    @Column({ type: 'varchar', length: 255 })
    discount!: string;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;

    @Column({ type: 'int', default: 0 })
    quantity_in_stock!: number;

    @Column({ type: 'int', default: 0 })
    quantity_reserved!: number;

    @Column({ type: 'int', default: 0 })
    quantity_selled!: number;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Color, (color) => color.variants)
    color!: Color

    @ManyToOne(() => Product, (product) => product.variants, {
        onDelete: 'CASCADE'
    })
    product!: Product
    
    @ManyToOne(() => ProductBatche, (batche) => batche.variants)
    batches!: ProductBatche;
    
    @OneToMany(() => OrderDetail, orderDetail => orderDetail.product_variant)
    order_details!: OrderDetail[];
    
    // @OneToMany(() => InventoryItem, (item) => item.product_variant)
    // inventory_items!: InventoryItem[];

    @OneToMany(() => ShipmentDetail, (detail) => detail.item)
    shipment_details!: ShipmentDetail[];

    @BeforeInsert()
    generateSku() {
        if (!this.sku) {
            this.sku = generateSku("PV", this.id ?? Date.now().toString());
        }
    }
}