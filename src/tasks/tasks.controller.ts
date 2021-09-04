import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { DeleteResult } from 'typeorm';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User) {
    this.logger.info('Calling getHello()', { controller: TasksController.name });
    this.logger.debug('Calling getHello()', { controller: TasksController.name });
    this.logger.verbose('warning');

    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('env')
  checkEnv() {
    return process.env;
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
    const { status, description } = updateTaskStatus;
    console.log(updateTaskStatus);

    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
