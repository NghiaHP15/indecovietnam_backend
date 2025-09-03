import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TypeNotification } from "../utils/enum";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "enum", enum: TypeNotification, default: TypeNotification.ORDER })
    type!: TypeNotification;

    @Column({ type: 'text' })
    message!: string;

    @Column({ type: "boolean", default: false })
    isRead!: boolean;

    @Column({ type: 'varchar', length: 255, default: '' })
    orderId!: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    contactId!: string;

    @CreateDateColumn()
    created_at!: Date;
}