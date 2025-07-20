import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProductRequest } from "./ProductRequest";
import { ProductBatche } from "./ProductBatche";

@Entity()
export class Factory {
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 255 })
    description!: string;

    @Column({ type: 'varchar', length: 255 })
    address!: string;

    @Column({ type: 'varchar', length: 100 })
    contact_person!: string;

    @Column({ type: 'varchar', length: 255 })
    email!: string;

    @Column({ type: 'varchar', length: 20 })
    phone!: string;

    @OneToMany(() => ProductRequest, request => request.factory)
    requests!: ProductRequest[];

    @OneToMany(() => ProductBatche, batche => batche.factory)
    batches!: ProductBatche[];
}