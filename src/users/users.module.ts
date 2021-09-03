import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AuthModule, ScheduleModule.forRoot()],
  controllers: [UsersController],
})
export class UsersModule {}
