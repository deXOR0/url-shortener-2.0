import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthRepository,
        PrismaService,
        JwtStrategy,
        UserRepository,
    ],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION,
            },
        }),
    ],
})
export class AuthModule {}
