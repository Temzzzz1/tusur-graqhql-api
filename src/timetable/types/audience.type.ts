import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Audience')
export class AudienceType {
    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    addr?: string

    @Field({ nullable: true })
    lonlat?: string
}
