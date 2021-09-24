import { Controller, Get, UseGuards, Inject, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/app/users/user.entity';
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { MailService } from 'src/mail/mail.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private mailService: MailService) {}

  @Get('profile')
  getProfile(@GetUser() user: User): User {
    this.logger.warn('Calling getHello()');

    return user;
  }

  @Post('send-mail')
  async sendMail(@GetUser() user: User) {
    await this.mailService.sendUserConfirmation(user, 'token');

    return {
      sendmail: 'ok',
    };
  }
}
