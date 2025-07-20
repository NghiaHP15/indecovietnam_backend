import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Gender, Position, Status_active } from "../utils/enum";
import { Blog } from "./Blog";
import { QaulityCheck } from "./QualityCheck";
import { Role } from "./Role";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({ unique: true, length: 255 })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    fullname!: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash!: string;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.OTHER
    })
    gender!: Gender;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address?: string;

    @Column({ 
        type: 'enum',
        enum: Position,
        default: Position.OTHER
    })
    position!: Position;

    @Column({type: "date", nullable: true })
    date_of_birth?: Date;

    @Column({
        type: 'enum',
        enum: Status_active,
        default: Status_active.ACTIVE
    })
    status_active!: Status_active;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar?: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Role, role => role.employees)
    role!: Role;

    @OneToMany(() => Blog, blog => blog.author)
    blogs!: Blog[];

    @OneToMany(() => QaulityCheck, check => check.checked_by)
    checks!: QaulityCheck[];
}