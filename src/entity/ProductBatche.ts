import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductBatchesStatus } from "../utils/enum";
import { Factory } from "./Factory";
import { ProductRequest } from "./ProductRequest";
import { ProductVariant } from "./ProductVariant";
import { WarehouseImport } from "./WarehouseImport";
import { QaulityCheck } from "./QualityCheck";
import { InventoryItem } from "./InventoryItem";

@Entity()
export class ProductBatche {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    code!: string;

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'date' })
    producted_date!: Date;

    @Column({ type: 'enum', enum: ProductBatchesStatus, default: ProductBatchesStatus.PENDING })
    status!: ProductBatchesStatus;

    @Column({ type: 'varchar', length: 255 })
    note!: string

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date

    @ManyToOne(() => Factory, (factory) => factory.batches)
    factory!: Factory;

    @ManyToOne(() => ProductRequest, (request) => request.batches)
    request!: ProductRequest;

    @OneToMany(() => ProductVariant, (variant) => variant.batches)
    variants!: ProductVariant[];

    @OneToMany(() => WarehouseImport, (imported) => imported.batche)
    imports!: WarehouseImport[]

    @OneToOne(() => QaulityCheck, (check) => check.batche)
    check!: QaulityCheck;

    @OneToMany(()=> InventoryItem, (item) => item.batche)
    inventory_items!: InventoryItem[];
}