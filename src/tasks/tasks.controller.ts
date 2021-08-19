import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
    return this.tasksService.createTask(createTaskDto);
  }
}
