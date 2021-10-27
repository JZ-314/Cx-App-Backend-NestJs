import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './entities/meetingEntity';
import { CreateMeetingDto } from './dto/createMeetingDto';
import { UpdateMeetingDto } from './dto/updateMeetingDto';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
  ) {}

  async create(createMeetingDto: CreateMeetingDto) {
    try {
      const { title, description, start, end, userId } = createMeetingDto;

      const meeting: Meeting = await this.meetingRepo.create({
        title,
        description,
        start: new Date(start),
        end: new Date(end),
        userId,
      });
      await this.meetingRepo.save(meeting);

      return {
        success: true,
        user: meeting,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async findAll() {
    try {
      return {
        success: true,
        data: await this.meetingRepo.find(),
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async findOne(id: string) {
    try {
      return {
        success: true,
        data: await this.meetingRepo.findOne(id),
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async findAllByPayload(payload: any) {
    try {
      return {
        success: true,
        data: await this.meetingRepo.find({ where: payload }),
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async update(id: string, updateMeetingDto: UpdateMeetingDto) {
    try {
      await this.meetingRepo.update({ id }, updateMeetingDto);
      return {
        success: true,
        data: await this.meetingRepo.findOne(id),
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async remove(id: string) {
    try {
      const result = await this.meetingRepo.delete({ id });
      return {
        success: true,
        data: result,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }
}
