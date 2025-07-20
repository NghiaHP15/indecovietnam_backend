import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "./ProductCategory";

@Entity()
export class RoomCategory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    title!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;

    @Column({ type: 'boolean', default: false })
    featured!: boolean;

    @CreateDateColumn()
    created_at?: Date;
    
    @UpdateDateColumn()
    updated_at?: Date;

    @OneToMany(() => ProductCategory, category => category.roomCategory)
    productCategories!: ProductCategory[];
}