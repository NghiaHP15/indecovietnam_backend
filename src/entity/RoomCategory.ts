import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { generateNormalized, generateSlug } from "../config/contant";

@Entity()
export class RoomCategory {
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

    @Column({ type: 'text', nullable: true, default: '' })
    description?: string;

    @Column({ type: 'boolean', default: false })
    featured!: boolean;

    @CreateDateColumn()
    created_at?: Date;
    
    @UpdateDateColumn()
    updated_at?: Date;

    @OneToMany(() => ProductCategory, category => category.roomCategory)
    productCategories!: ProductCategory[];

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