import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { DeleteResult } from 'typeorm';
import { TasksService } from 'src/app/tasks/tasks.service';
import { CreateTaskDto } from 'src/app/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/app/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskDto } from 'src/app/tasks/dto/update-task.dto';
import { Task } from 'src/app/tasks/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/app/users/user.entity';
import { Roles, ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from 'src/app/auth/roles.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
// AuthGuard must be run before roleGuard
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.User)
export class TasksController {
  constructor(
    private tasksService: TasksService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private reflector: Reflector,
  ) {}

  @ApiBody({ type: [GetTasksFilterDto] })
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User) {
    this.logger.info('Calling getHello()', { controller: TasksController.name });
    this.logger.debug('Calling getHello()', { controller: TasksController.name });
    this.logger.verbose('warning');

    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('env/:id')
  @Roles(Role.User)
  checkEnv(@Param('id') id: number) {
    return {
      env: process.env,
      id,
    };
  }

  @Get(':id')
  @Roles(Role.Admin)
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    console.log(this.reflector.get(ROLES_KEY, this.checkEnv));
    console.log(this.reflector.getAll(ROLES_KEY, [this.checkEnv, this.createTask, this.getTaskById, TasksController]));
    console.log(
      this.reflector.getAllAndOverride(ROLES_KEY, [this.getTaskById, this.checkEnv, this.createTask, TasksController]),
    );
    console.log(
      this.reflector.getAllAndMerge(ROLES_KEY, [this.checkEnv, this.createTask, this.getTaskById, TasksController]),
    );
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto) {
    return 123;
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
