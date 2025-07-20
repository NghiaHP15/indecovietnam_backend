import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BlogCategory } from "./BlogCategory";
import { Employee } from "./Employee";

@Entity()
export class Blog {
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

    @Column({ type: 'boolean', default: false })
    latest_blog!: boolean;

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

    @ManyToOne(() => BlogCategory, (category) => category.blogs)
    category!: BlogCategory;

    @ManyToOne(() => Employee, (employee) => employee.blogs)
    author!: Employee;
}