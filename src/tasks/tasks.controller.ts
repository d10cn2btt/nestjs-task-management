import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/task.model';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
    return this.tasksService.createTask(createTaskDto);
  }
}
