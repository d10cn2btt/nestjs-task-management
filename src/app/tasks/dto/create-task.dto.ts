import { IsNotEmpty } from 'class-validator';
import { MustLongerThan } from 'src/common/pipes/must-longer-than.validate';

export class CreateTaskDto {
  @MustLongerThan({
    message: 'dkm sai roi nhe',
  })
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
