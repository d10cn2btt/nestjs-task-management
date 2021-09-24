import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/app/users/users.repository';
import { AuthCredentialsDto } from 'src/app/auth/dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/app/auth/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository, private jwtService: JwtService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const payload: JwtPayload = { username, option: 111 };
      const accessToken = this.jwtService.sign(payload);

      // this data will be transfer to jwt.strategy validate()
      return { accessToken };
    }

    throw new UnauthorizedException('User not found');
  }
}
