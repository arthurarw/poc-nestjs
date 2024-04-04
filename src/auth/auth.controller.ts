import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  async login(@Body() loginAuthDto: LoginAuthDto) {
    console.log(loginAuthDto);
    return await this.authService.signIn(
      loginAuthDto.email,
      loginAuthDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async me(@Request() req) {
    return req.user;
  }
}
