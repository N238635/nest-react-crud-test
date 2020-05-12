import { UsersService } from "./users.service";
import { CreateUserInput, UpdateUserInput } from "./inputs/user.input";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    users(skip?: number, limit?: number): Promise<import("./interfaces/user.interface").User[]>;
    user(id: string): Promise<import("./interfaces/user.interface").User>;
    createUser(input: CreateUserInput): Promise<import("./interfaces/user.interface").User>;
    updateUser(id: string, input: UpdateUserInput): Promise<import("./interfaces/user.interface").User>;
    deleteUser(id: string): Promise<import("./interfaces/user.interface").User>;
}
