import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeNotification } from "../utils/enum";
import { Order } from "./Order";
import { Feedback } from "./Feedback";

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
    @CreateDateColumn()
    created_at!: Date;
    @OneToOne(() => Order, (order) => order.notification)
    @JoinColumn()
    order!: Order;
    @OneToOne(() => Feedback, (feedback) => feedback.notification)
    @JoinColumn()
    contact!: Feedback;
}