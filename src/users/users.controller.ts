import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  @Get('profile')
  getProfile(@GetUser() user: User): User {
    return user;
  }
}
