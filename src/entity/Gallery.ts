import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { TypeGallery } from "../utils/enum";

@Entity()
export class Gallery {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    href?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    desciption?: string;

    @Column({ type: 'enum', enum: TypeGallery, default: TypeGallery.SOCIAL })
    type!: TypeGallery;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;
}