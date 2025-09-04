import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeFeedback } from "../utils/enum";
import { Notification } from "./Notification";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column({ type: "varchar", length: 255 })
    name!: string;
    @Column({ type: "varchar", length: 255, nullable: true })
    avatar?:string;
    @Column({ type: "varchar", length: 255, nullable: true })
    role?: string;
    @Column({ type: "varchar", length: 100 })
    email!: string;
    @Column({ type: "varchar", length: 50 })
    phone!: string;
    @Column({ type: "enum", enum: TypeFeedback, default: TypeFeedback.FEEDBACK })
    type!: TypeFeedback;
    @Column({ type: "varchar", length: 255 })
    subject!: string;
    @Column({ type: "text" })
    message!: string;
    @Column({ type: "boolean", default: false })
    show!: boolean;
    @CreateDateColumn()
    created_at!: Date;
    @UpdateDateColumn()
    updated_at!: Date;
    @OneToOne(() => Notification, (notification) => notification.contact)
    notification!: Notification
}