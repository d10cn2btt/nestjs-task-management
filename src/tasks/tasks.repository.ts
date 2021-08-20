import { EntityRepository, Repository } from 'typeorm';
import { Task } from 'src/tasks/task.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TaskStatus } from 'src/tasks/task-status.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
}
