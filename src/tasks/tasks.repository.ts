import { EntityRepository, Repository } from 'typeorm';
import { Task } from 'src/tasks/task.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository');

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
