import { AudienceDto, NoteByDateDto, TeacherDto, TimeDto } from 'src/timetable/dtos/lesson.dto';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, BaseEntity, OneToOne } from 'typeorm';
import { AudienceEntity } from './audience.entity';

import { GroupEntity } from './group.entity';
import { NoteByDateEntity } from './note-by-date.entity';
import { TeacherEntity } from './teacher.entity';
import { TimeEntity } from './time.entity';



@Entity('Lesson')
export class LessonEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => GroupEntity, group => group.lessons, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn()
    group: GroupEntity

    @Column()
    subject: string

    @Column()
    type: string

    @Column()
    date: string

    @OneToOne(() => TimeEntity, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    time?: TimeEntity

    @OneToMany(() => NoteByDateEntity, noteByDate => noteByDate.lessons, {
        onDelete: 'CASCADE',
        nullable: true
    })
    note_by_date?: NoteByDateEntity[]

    @OneToMany(() => AudienceEntity, audience => audience.lessons, {
        onDelete: 'CASCADE',
        nullable: true
    })
    audiences?: AudienceEntity[]

    @OneToMany(() => TeacherEntity, teacher => teacher.lessons, {
        onDelete: 'CASCADE',
        nullable: true
    })
    teachers?: TeacherEntity[]
}