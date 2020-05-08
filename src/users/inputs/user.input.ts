import { InputType, Field } from "@nestjs/graphql";
import { Email } from "../email.scalar";

@InputType()
export class CreateUserInput {
    @Field(() => Email)
    readonly email: string;
    @Field()
    readonly name: string;
}

@InputType()
export class UpdateUserInput {
    @Field(() => Email, { nullable: true })
    email?: string;
    @Field({ nullable: true })
    name?: string;
}