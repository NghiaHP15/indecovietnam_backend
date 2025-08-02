import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Service } from "./Service";

@Entity()
export class ServiceCategory {
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

    @OneToMany(() => Service, service => service.category)
    services!: Service[];
}