import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [UserController],
    providers: [UserService, JwtAuthGuard, UserRepository, PrismaService],
})
export class UserModule {}
