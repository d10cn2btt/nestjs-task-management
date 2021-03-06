import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from 'src/app/auth/dto/auth-credentials.dto';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Get admin section' })
  @Post('sign-up')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('sign-in')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
