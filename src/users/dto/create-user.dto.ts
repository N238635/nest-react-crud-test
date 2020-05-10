import { ObjectType, Field, ID } from "@nestjs/graphql";
import { EmailScalar } from "../email.scalar-type";

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;
    @Field(() => EmailScalar)
    readonly email: string;
    @Field()
    readonly name: string;
}