import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType('GetByTeacher')
export class GetByTeacherInput {
    @Field()
    name: string
}