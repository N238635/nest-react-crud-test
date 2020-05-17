import { Model } from 'mongoose';
import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(createUserDto: CreateUserInput): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserInput): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async findAll(skip: number, limit: number): Promise<User[]> {
        return this.userModel.find().skip(skip).limit(limit).exec();
    }
}
