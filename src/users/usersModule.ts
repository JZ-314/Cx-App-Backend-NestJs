import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './usersService';
import { TeamsModule } from '../teams/teamsModule';
import { UsersController } from './usersController';
import { User } from './entity/userEntity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TeamsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
