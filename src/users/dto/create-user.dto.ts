import { ObjectType, Field, ID, Scalar } from "@nestjs/graphql";
import { Email } from "../email.scalar";

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;
    @Field(() => Email)
    readonly email: string;
    @Field()
    readonly name: string;
}