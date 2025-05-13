// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

class LoginDto {
  username: string;
  password: string;
}

class RegisterDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const userExists = await this.usersService.findByUsername(dto.username);
    if (userExists) {
      throw new HttpException('Usuario ya existe', HttpStatus.CONFLICT);
    }
    const user = await this.usersService.createUser({ ...dto });
    return {
      message: `Usuario ${dto.username} se ha registrado`,
      userId: user.id,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );
    if (!user) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.login(user);
  }
}
