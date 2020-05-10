import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.gql'],
    }),
    MongooseModule.forRoot('mongodb://localhost/nest', { useFindAndModify: false }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
