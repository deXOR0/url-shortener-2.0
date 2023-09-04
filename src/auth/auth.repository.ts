import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDTO } from './dto/create-auth.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async register(email: string, password: string): Promise<User> {
        return this.prismaService.user.create({
            data: {
                email: email,
                password: password,
            },
        });
    }
}
