import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Blog } from "./Blog";

@Entity()
export class BlogCategory {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'varchar', length: 255, unique: true })
    title!: string

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string

    @Column({ type: 'text', nullable: true })
    description?: string

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date

    @OneToMany(() => Blog, blog => blog.category)
    blogs!: Blog[];
}