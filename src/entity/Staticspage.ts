import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';   

@Entity()
export class Staticspage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'text' })
    content!: string;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;
}