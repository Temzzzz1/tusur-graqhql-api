import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType('NoteByDate')
export class NoteByDateType {
    @Field({ nullable: true })
    date?: string

    @Field({ nullable: true })
    note?: string
}
