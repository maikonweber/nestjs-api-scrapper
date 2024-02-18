import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiProperty } from '@nestjs/swagger';


class LoginDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  LoginIn(@Body() loginDto: LoginDTO) {
    return this.authService.loginIn(loginDto.username, loginDto.password);
  }

}
