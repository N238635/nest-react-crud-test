import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserInput): Promise<User>;
    update(id: string, updateUserDto: UpdateUserInput): Promise<User>;
    delete(id: string): Promise<User>;
    findById(id: string): Promise<User>;
    findAll(skip: number, limit: number): Promise<User[]>;
}
