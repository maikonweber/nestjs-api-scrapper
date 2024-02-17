import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import cryto from 'crypto';
import { PrismaService } from 'prisma/PrismaService';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {

  }


  generateSalt(rounds: number) {
    if (rounds >= 15) {
      throw new Error(`${rounds} is greater than 15, must be less that 15`);
    }
    return cryto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
  }

  hasher(password: string, salt: string) {
    if (salt == "") {
      salt = this.generateSalt(12);
    }

    let hash = cryto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');

    return {
      salt: salt,
      hashedpassword: value
    }
  }

  async loginIn(username: string, password: string) {
    const user = await this.prismaService.user.findFirstOrThrow(
      {
        where: {
          username: username
        }
      }
    )

    if (!user) throw new NotFoundException("Not Found this user");
    const hash = this.hasher(password, user.salt);
    if (hash.hashedpassword != user.hashed) throw new NotAcceptableException("Not Accept This password");

    const acess_token: string = await this.jwtService.signAsync(
      {
        username: user.username,
        name: user.name,
        id: user.id,
        email: user.email
      }
    )

    return acess_token

  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
