import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { ProductVariant } from "./ProductVariant";
import { generateSlug } from "../config/contant";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255})
    name!: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    slug!: string;

    @Column({ type: 'decimal' })
    total_price!: number;
    
    @Column({ type: 'int'})
    quantity!: number;

    @ManyToOne(() => Order, (order) => order.products)
    order!: Order;

    @ManyToOne(() => ProductVariant, (variant) => variant.order_details)
    product_variant!: ProductVariant;

    @BeforeInsert()
    @BeforeUpdate()
    slugName() {
        this.slug = generateSlug(this.name);
    }
}