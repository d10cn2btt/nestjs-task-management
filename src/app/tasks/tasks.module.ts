import { Module } from '@nestjs/common';
import { TasksController } from 'src/app/tasks/tasks.controller';
import { TasksService } from 'src/app/tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from 'src/app/tasks/tasks.repository';
import { AuthModule } from 'src/app/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
