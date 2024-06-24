import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../JwtContant';
import { PrismaService } from 'prisma/PrismaService';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(
        private readonly authService: AuthService,
        private readonly prismaService: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any): Promise<any> {
        const { id } = payload;
        const account = await this.prismaService.users.findFirstOrThrow({
            where: {
                id: id
            }
        })
        if (account) {
            return payload;
        }
        throw new UnauthorizedException('Invalid user or usecase');
    }
}