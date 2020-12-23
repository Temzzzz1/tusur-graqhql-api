import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { LessonEntity } from './lesson.entity';

@Entity('Teacher')
export class TeacherEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => LessonEntity, lesson => lesson.teachers, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn()
    lessons: LessonEntity

    @Column({ nullable: true })
    name: string
}