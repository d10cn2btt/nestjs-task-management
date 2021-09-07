import { Controller, Get, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/user.entity';
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  @Get('profile')
  getProfile(@GetUser() user: User): User {
    this.logger.warn('Calling getHello()');

    return user;
  }
}
