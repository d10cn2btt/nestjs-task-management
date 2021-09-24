import { Module } from '@nestjs/common';
import { UsersController } from 'src/app/users/users.controller';
import { AuthModule } from 'src/app/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [AuthModule, ScheduleModule.forRoot(), MailModule],
  controllers: [UsersController],
})
export class UsersModule {}
