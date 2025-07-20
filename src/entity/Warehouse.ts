import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WarehouseImport } from "./WarehouseImport";
import { InventoryItem } from "./InventoryItem";

@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255 })
    description!: string;

    @Column({ type: 'varchar', length: 255 })
    address!: string;
    
    @OneToMany(() => WarehouseImport, (imported) => imported.warehouse)
    imports!: WarehouseImport[];

    @OneToMany(() => InventoryItem, (item) => item.warehouse)
    inventory_items!: InventoryItem[];
}