import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from 'src/app/tasks/task.entity';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Expose()
  get fullName(): string {
    return `This is ${this.username}`;
  }

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  task: Task[];
}
