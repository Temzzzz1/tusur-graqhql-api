import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType('Filter')
export class FilterInput {
    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    sortByTeacher?: string

    @Field({ nullable: true })
    sortByDate?: string

    @Field(() => Int, { defaultValue: 0, nullable: true })
    skip?: number

    @Field(() => Int, { defaultValue: 20, nullable: true })
    limit?: number
}