import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Blog } from "./Blog";
import { generateNormalized, generateSlug } from "../config/contant";

@Entity()
export class BlogCategory {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'varchar', length: 255, unique: true })
    title!: string

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string

    @Column({ type: 'varchar', length: 255, default: '' })
    title_normalized?: string;

    @Column({ type: 'text', nullable: true })
    description?: string

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date

    @OneToMany(() => Blog, blog => blog.category)
    blogs!: Blog[];

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