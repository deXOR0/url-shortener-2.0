import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Url } from '@prisma/client';

@Injectable()
export class ShortUrlRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async getShortUrl(shortUrl: string): Promise<Url> {
        return await this.prismaService.url.findUnique({
            where: {
                short_url: shortUrl,
            },
        });
    }

    async create(id: string, url: string, shortUrl: string, password: string) {
        return this.prismaService.url.create({
            data: {
                url,
                short_url: shortUrl,
                password,
                user: {
                    connect: {
                        id,
                    },
                },
            },
        });
    }
}
