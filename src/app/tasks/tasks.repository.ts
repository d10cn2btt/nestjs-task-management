import { EntityRepository, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Task } from 'src/app/tasks/task.entity';
import { CreateTaskDto } from 'src/app/tasks/dto/create-task.dto';
import { TaskStatus } from 'src/app/tasks/task-status.enum';
import { GetTasksFilterDto } from 'src/app/tasks/dto/get-tasks-filter.dto';
import { User } from 'src/app/users/user.entity';
import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  @Inject(WINSTON_MODULE_PROVIDER) private logger = new Logger('TasksRepository');

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('status = :status', { status });
    }

    if (search) {
      query.andWhere('(title LIKE :search OR description LIKE :search)', { search: `%${search}%` });
    }

    try {
      // console.log(query.getSql());
      return await query.getMany();
    } catch (e) {
      this.logger.error(`Error when create task with ${user.username}`, e.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  }
}
