import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusProduct } from "../utils/enum";
import { ProductVariant } from "./ProductVariant";
import { ProductCategory } from "./ProductCategory";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    name!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'varchar', length: 255,  nullable: true })
    image?: string;

    @Column({type: 'text', nullable: true})
    description?: string;

    @Column({ 
        type: 'enum', 
        enum: StatusProduct, 
        default: StatusProduct.DEFAULT
    })
    status!: StatusProduct;

    @Column({ type: 'boolean', default: false })
    featured!: boolean;

    @Column({type: 'text', nullable: true})
    body?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
    productCategory!: ProductCategory;

    @OneToMany(() => ProductVariant, variant => variant.product)
    variants!: ProductVariant[];
}