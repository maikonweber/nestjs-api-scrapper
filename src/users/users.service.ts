import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/PrismaService';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService) {
  }
  create(createUserDto: CreateUserDto) {
    const hash = this.authService.hasher(createUserDto.password, '');
    return this.prismaService.user.create(
      {
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          cpf: createUserDto.cpf,
          lastname: createUserDto.lastname,
          username: createUserDto.username,
          hashed: hash.hashedpassword,
          salt: hash.salt
        }
      }
    )
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
