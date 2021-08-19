import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from 'src/tasks/task.model';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }
}
