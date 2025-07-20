import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WarehouseImportStatus } from "../utils/enum";
import { ProductBatche } from "./ProductBatche";
import { Warehouse } from "./Warehouse";
import { InventoryItem } from "./InventoryItem";

@Entity()
export class WarehouseImport {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    code!: string;

    @Column({ type: 'date' })
    import_date!: Date;

    @Column({ type: 'enum', enum: WarehouseImportStatus, default: WarehouseImportStatus.PENDING })
    status!: WarehouseImportStatus;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => ProductBatche, (batche) => batche.imports)
    batche!: ProductBatche;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.imports)
    warehouse!: Warehouse;

    @OneToMany(() => InventoryItem, (item) => item.import)
    items!: InventoryItem[];
}