import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetingDto } from './createMeetingDto';

export class UpdateMeetingDto extends PartialType(CreateMeetingDto) {}
