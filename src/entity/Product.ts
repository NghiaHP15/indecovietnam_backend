import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusProduct } from "../utils/enum";
import { ProductVariant } from "./ProductVariant";
import { ProductCategory } from "./ProductCategory";
import { generateNormalized, generateSlug } from "../config/contant";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    name!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    name_normalized?: string;

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

    @Column({ type: 'int', default: 0 })
    views!: number;

    @Column({ type: 'float', default: 0 })
    min_price!: number;

    @Column({ type: 'float', default: 0 })
    max_price!: number;

    @Column({type: 'text', nullable: true})
    body?: string;

    @Column({type: 'text', nullable: true})
    policy?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
    productCategory!: ProductCategory;

    @OneToMany(() => ProductVariant, variant => variant.product, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    variants!: ProductVariant[];

    @BeforeInsert()
    @BeforeUpdate()
    normalizeName() {
        this.name_normalized = generateNormalized(this.name).toLowerCase();
    }
    @BeforeInsert()
    @BeforeUpdate()
    slugName() {
        this.slug = generateSlug(this.name);
    }
}