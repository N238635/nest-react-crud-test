import { InputType, Field } from "@nestjs/graphql";
import { EmailScalar } from "../email.scalar-type";

@InputType()
export class CreateUserInput {
    @Field(() => EmailScalar)
    readonly email: string;
    @Field()
    readonly name: string;
}

@InputType()
export class UpdateUserInput {
    @Field(() => EmailScalar, { nullable: true })
    email?: string;
    @Field({ nullable: true })
    name?: string;
}