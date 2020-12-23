import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { AudienceType } from './audience.type'
import { NoteByDateType } from './note-by-date.type'
import { TeacherType } from './teacher.type'
import { TimeType } from './time.type'


@ObjectType('Lesson')
export class LessonType {
    @Field()
    subject: string

    @Field({ nullable: true })
    type?: string

    @Field({ nullable: true })
    time?: TimeType

    @Field()
    date: string

    @Field(() => [NoteByDateType], { nullable: 'itemsAndList' })
    note_by_date?: NoteByDateType[]

    @Field(() => [AudienceType], { nullable: 'itemsAndList' })
    audiences?: AudienceType[]

    @Field(() => [TeacherType], { nullable: 'itemsAndList' })
    teachers?: TeacherType[]
}
