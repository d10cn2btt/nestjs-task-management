import { Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }
}
