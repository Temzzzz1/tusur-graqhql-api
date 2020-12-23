import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';

@Entity('Time')
export class TimeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    start?: string

    @Column({ nullable: true })
    end?: string
}