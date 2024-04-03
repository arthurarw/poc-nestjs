import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  login(loginAuthDto: LoginAuthDto) {
    return loginAuthDto;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }
}
