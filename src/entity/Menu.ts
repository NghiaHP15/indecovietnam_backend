import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PositionMenu } from "../utils/enum";
import { generateNormalized } from "../config/contant";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'text' })
    item!: string;

    @Column({ type: 'varchar', length: 100 })
    position!: PositionMenu;

    @Column({ type: 'varchar', length: 255, default: '' })
    name_normalized!: string;

    @BeforeInsert()
    @BeforeUpdate()
    normalizename() {
       this.name_normalized = generateNormalized(this.name).toLowerCase();
    }
}