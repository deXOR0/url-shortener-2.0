import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async register(email: string, password: string): Promise<User> {
        return this.prismaService.user.create({
            data: {
                email: email,
                password: password,
            },
        });
    }

    async getByEmail(email: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
    }

    async updatePassword(id: string, password: string) {
        return this.prismaService.user.update({
            data: {
                password,
            },
            where: {
                id,
            },
        });
    }
}
