import { Resolver, Query, Mutation, Args, ID, Int } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./dto/create-user.dto";
import { CreateUserInput, UpdateUserInput } from "./inputs/user.input";

@Resolver()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Query(() => [User])
    async users(
        @Args('skip', { type: () => Int }) skip: number = 0,
        @Args('limit', { type: () => Int }) limit: number = 10
    ) {
        return this.usersService.findAll(skip, limit);
    }

    @Query(() => User)
    async user(@Args('id', { type: () => ID }) id: string) {
        return this.usersService.findById(id);
    }

    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput) {
        return this.usersService.create(input);
    }

    @Mutation(() => User)
    async updateUser(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateUserInput
    ) {
        return this.usersService.update(id, input);
    }

    @Mutation(() => User)
    async deleteUser(@Args('id', { type: () => ID }) id: string) {
        return this.usersService.delete(id);
    }
}