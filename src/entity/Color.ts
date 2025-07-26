import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariant } from "./ProductVariant";

@Entity()
export class Color {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    name!: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    code!: string;

    @OneToMany(() => ProductVariant, variant => variant.color)
    variants!: ProductVariant[]
}