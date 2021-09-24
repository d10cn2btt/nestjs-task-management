import { TaskStatus } from 'src/app/tasks/task-status.enum';
import { IsEnum } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateTaskDto } from 'src/app/tasks/dto/create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  // export class UpdateTaskDto extends PickType(CreateTaskDto, ['description']) {
  // export class UpdateTaskDto extends OmitType(CreateTaskDto, ['description']) {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}