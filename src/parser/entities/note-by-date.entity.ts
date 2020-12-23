import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { LessonEntity } from './lesson.entity';

@Entity('NoteByDate')
export class NoteByDateEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => LessonEntity, lesson => lesson.note_by_date, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn()
    lessons: LessonEntity

    @Column()
    date: string

    @Column()
    note: string
}