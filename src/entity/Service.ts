import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ServiceCategory } from "./ServiceCategory";

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    title!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;

    @Column({ type: 'simple-json' })
    tag?: string[];

    @Column({ type: 'text', nullable: true })
    body?: string;

    @Column({ type: 'date', nullable: true })
    published_at?: Date;

    @CreateDateColumn()
    created_at!: Date;
    
    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => ServiceCategory, (category) => category.services)
    category!: ServiceCategory;
}