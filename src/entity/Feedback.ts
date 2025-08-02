import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column({ type: "varchar", length: 255 })
    name!: string;
    @Column({ type: "varchar", length: 100 })
    email!: string;
    @Column({ type: "varchar", length: 50 })
    phone!: string;
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
}