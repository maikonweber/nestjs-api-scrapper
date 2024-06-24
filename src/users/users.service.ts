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
    return this.prismaService.users.create(
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
    return this.prismaService.users.findMany();
  }

  findOne(id: number) {
    return this.prismaService.users.findFirstOrThrow(
      {
        where: {
          id: id
        }
      }
    )
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.users.update({
      where: {
        id: id
      },
      data: UpdateUserDto
    });
  }

  remove(id: number) {
    return this.prismaService.users.delete({
      where: {
        id: id
      }
    });
  }
}
