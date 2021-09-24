import { IsNotEmpty } from 'class-validator';
import { MustLongerThan } from 'src/common/pipes/must-longer-than.validate';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title for task',
    enum: ['admin', 'user'],
  })
  @MustLongerThan({
    message: 'dkm sai roi nhe',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
