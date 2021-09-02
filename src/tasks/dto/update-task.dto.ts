import { TaskStatus } from 'src/tasks/task-status.enum';
import { IsEnum } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  // export class UpdateTaskDto extends PickType(CreateTaskDto, ['description']) {
  // export class UpdateTaskDto extends OmitType(CreateTaskDto, ['description']) {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
