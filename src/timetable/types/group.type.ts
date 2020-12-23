import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { LessonType } from './lesson.type';

@ObjectType('Group')
export class GroupType {
    @Field()
    id: number

    @Field()
    name: string
}
