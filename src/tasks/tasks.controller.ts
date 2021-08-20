import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { TasksRepository } from 'src/tasks/tasks.repository';
import { Task } from 'src/tasks/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    const result = this.tasksService.deleteTask(id);
    // console.log(result);
    result.then((r) => console.log(r));
    return result;
  }
}
