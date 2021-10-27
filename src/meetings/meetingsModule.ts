import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetingsService';
import { MeetingsController } from './meetingsController';
import { Meeting } from './entities/meetingEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  controllers: [MeetingsController],
  providers: [MeetingsService],
  exports: [MeetingsService],
})
export class MeetingsModule {}
