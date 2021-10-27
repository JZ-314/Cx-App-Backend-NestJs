import { IsNotEmpty } from 'class-validator';

export class CreateMeetingDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() description: string;
  @IsNotEmpty() start: Date;
  @IsNotEmpty() end: Date;
  @IsNotEmpty() userId: string;
}
