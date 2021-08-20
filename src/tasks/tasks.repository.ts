import { EntityRepository, Repository } from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}
