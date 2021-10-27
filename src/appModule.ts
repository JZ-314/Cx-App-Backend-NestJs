import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './appController';
import { AppService } from './appService';
import { UsersModule } from './users/usersModule';
import { AuthModule } from './auth/authModule';
import { ContactsModule } from './contacts/contactsModule';
import { MeetingsModule } from './meetings/meetingsModule';
import { TeamsModule } from './teams/teamsModule';
import { SalesRepsModule } from './salesReps/salesRepsModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    ContactsModule,
    MeetingsModule,
    TeamsModule,
    SalesRepsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
