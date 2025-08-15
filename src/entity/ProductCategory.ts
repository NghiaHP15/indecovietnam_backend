import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoomCategory } from "./RoomCategory";
import { Product } from "./Product";
import { generateNormalized, generateSlug } from "../config/contant";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    title!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    title_normalized?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;

    @Column({type: 'text', nullable: true})
    description?: string;

    @Column({ type: 'boolean', default: false })
    featured!: boolean;

    @CreateDateColumn()
    created_at?: Date;
    
    @UpdateDateColumn()
    updated_at?: Date;
    
    @OneToMany(() => Product, product => product.productCategory)
    products!: Product[];

    @ManyToOne(() => RoomCategory, (roomCategory) => roomCategory.productCategories)
    roomCategory!: RoomCategory;

    @BeforeInsert()
    @BeforeUpdate()
    normalizeTitle() {
        this.title_normalized = generateNormalized(this.title).toLowerCase();
    }
    @BeforeInsert()
    @BeforeUpdate()
    slugTitle() {
        this.slug = generateSlug(this.title);
    }
}