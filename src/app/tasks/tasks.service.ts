import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/app/tasks/dto/create-task.dto';
import { TasksRepository } from 'src/app/tasks/tasks.repository';
import { Task } from 'src/app/tasks/task.entity';
import { TaskStatus } from 'src/app/tasks/task-status.enum';
import { GetTasksFilterDto } from 'src/app/tasks/dto/get-tasks-filter.dto';
import { User } from 'src/app/users/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

// The @Injectable() decorator declares the TasksService class as a class that can be managed by the Nest IoC container.
@Injectable()
export class TasksService {
  // private logger = new Logger('TasksService');

  constructor(private tasksRepository: TasksRepository) {}

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // const task = await this.tasksRepository.findOne(id);
    const task = await this.tasksRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User) {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return result;
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
