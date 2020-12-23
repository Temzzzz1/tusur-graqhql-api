import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { LessonEntity } from './lesson.entity';

@Entity('Audience')
export class AudienceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => LessonEntity, lesson => lesson.audiences, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn()
    lessons: LessonEntity

    @Column({ nullable: true })
    name?: string

    @Column({ nullable: true })
    addr?: string

    @Column({ nullable: true })
    lonlat?: string
}