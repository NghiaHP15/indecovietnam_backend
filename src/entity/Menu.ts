import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PositionMenu } from "../utils/enum";

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
}