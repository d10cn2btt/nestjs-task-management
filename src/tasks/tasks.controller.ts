import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController', { timestamp: true });

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User) {
    this.logger.verbose(`User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);

    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<DeleteResult> {
    const result = this.tasksService.deleteTask(id, user);
    // console.log(result);
    result.then((r) => console.log(r));
    return result;
  }

  @Put(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatus;

    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
