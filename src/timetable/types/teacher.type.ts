import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType('Teacher')
export class TeacherType {
    @Field({ nullable: true })
    name?: string
}
