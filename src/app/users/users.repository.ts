import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/app/users/user.entity';
import { AuthCredentialsDto } from 'src/app/auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (e) {
      if (parseInt(e.code) === 23505) {
        throw new ConflictException('Username already exists');
      }

      throw new InternalServerErrorException(e);
    }
  }
}
