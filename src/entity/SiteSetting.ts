import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { SettingType } from "../utils/enum";

@Entity()
export class SiteSetting {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'text' })
    value!: string;

    @Column({ type: 'varchar', length: 100 })
    group!: string;

    @Column({
        type: 'enum',
        enum: SettingType,
        default: SettingType.TEXT,
    })
    type!: SettingType;

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
}