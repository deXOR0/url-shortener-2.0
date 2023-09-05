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
        return await this.prismaService.url.create({
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

    async getAllShortUrls(creatorId: string) {
        return await this.prismaService.url.findMany({
            select: {
                id: true,
                url: true,
                short_url: true,
                clicks: true,
                created_at: true,
                updated_at: true,
            },
            where: {
                creator_id: creatorId,
            },
        });
    }

    async addClicks(shortUrl: string, clicks: Number) {
        return await this.prismaService.url.update({
            data: {
                clicks: +clicks + 1,
            },
            where: {
                short_url: shortUrl,
            },
        });
    }
}
