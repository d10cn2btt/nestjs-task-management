import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/task.model';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }

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
    return this.tasksService.createTask(createTaskDto);
  }

  @Put(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    const { status } = updateTaskDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
