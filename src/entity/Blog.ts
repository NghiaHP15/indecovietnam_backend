import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BlogCategory } from "./BlogCategory";
import { Employee } from "./Employee";
import { generateNormalized, generateSlug } from "../config/contant";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    title!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    title_normalized!: string;

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