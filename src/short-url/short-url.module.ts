import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlRepository } from './short-url.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [ShortUrlController],
    providers: [ShortUrlService, ShortUrlRepository, PrismaService],
})
export class ShortUrlModule {}
