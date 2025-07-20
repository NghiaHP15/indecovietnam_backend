import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CheckStatus } from "../utils/enum";
import { Employee } from "./Employee";
import { ProductBatche } from "./ProductBatche";

@Entity()
export class QaulityCheck {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    code!: string;

    @Column({  type: 'enum', enum: CheckStatus, default: CheckStatus.PASS })
    status!: CheckStatus;

    @Column({ type: 'varchar', length: 255 })
    note!: string;

    @Column({ type: 'date' })
    checked_ate!: Date

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date

    @ManyToOne(() => Employee, (employee) => employee.checks)
    checked_by!: Employee;

    @OneToOne(() => ProductBatche, (batche) => batche.check)
    batche!: ProductBatche;
}