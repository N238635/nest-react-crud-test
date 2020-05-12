import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';
import { EmailScalar } from './email.scalar-type';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [UsersResolver, UsersService, EmailScalar],
})
export class UsersModule { }
