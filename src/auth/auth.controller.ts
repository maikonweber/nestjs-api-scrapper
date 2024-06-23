import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';



class LoginDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

@ApiTags("Authorization")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async LoginIn(@Body() loginDto: LoginDTO, @Res() response) { // Use @Res() response
    const token = await this.authService.loginIn(loginDto.username, loginDto.password);
    response.status(200).send({ token: token });
  }
}
