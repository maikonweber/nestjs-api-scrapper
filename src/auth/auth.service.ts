import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import cryto from 'crypto';

@Injectable()
export class AuthService {


  generateSalt(rounds: number) {
    if (rounds >= 15) {
      throw new Error(`${rounds} is greater than 15, must be less that 15`);
    }
    return cryto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
  }

  hasher(password: string, salt: string) {
      if(salt == "") {
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
