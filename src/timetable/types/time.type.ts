import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType('Time')
export class TimeType {
    @Field({ nullable: true})
    start?: string

    @Field({ nullable: true})
    end?: string
}
