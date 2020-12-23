import { LessonDto } from 'src/timetable/dtos/lesson.dto';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { LessonEntity } from './lesson.entity';

@Entity('Group')
export class GroupEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => LessonEntity, lesson => lesson.group, {
        onDelete: 'CASCADE',
        nullable: true
    })
    lessons: LessonEntity[];
}