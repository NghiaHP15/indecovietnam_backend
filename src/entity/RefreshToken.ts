// src/entities/refresh-token.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Customer } from './Customer';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  token!: string;

  @Column()
  expiresAt!: Date;

  @ManyToOne(() => Customer, (customer) => customer.refresh_token, { onDelete: 'CASCADE' })
  customer!: Customer;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  ip?: string;

  @Column({ nullable: true })
  userAgent?: string;
}
