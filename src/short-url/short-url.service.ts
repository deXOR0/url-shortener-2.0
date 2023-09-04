import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { ShortUrlRepository } from './short-url.repository';
import { customAlphabet } from 'nanoid';

@Injectable()
export class ShortUrlService {
    SHORT_URL_ALPHABET = process.env.SHORT_URL_ALPHABET;
    SHORT_URL_MIN_LENGTH = Number(process.env.SHORT_URL_MIN_LENGTH);
    nanoid = customAlphabet(this.SHORT_URL_ALPHABET, this.SHORT_URL_MIN_LENGTH);

    constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

    async generateShortUrl() {
        const shortUrl = this.nanoid();

        const shortUrlExists =
            await this.shortUrlRepository.getShortUrl(shortUrl);

        if (shortUrlExists) {
            return this.generateShortUrl();
        }

        return shortUrl;
    }

    async create(req, createShortUrlDto: CreateShortUrlDto) {
        const { user } = req;
        const { id } = user;
        let { url, shortUrl, password } = createShortUrlDto;

        if (!shortUrl) {
            shortUrl = this.nanoid();
        } else {
            shortUrl = shortUrl.toLowerCase();
            const shortUrlExists =
                await this.shortUrlRepository.getShortUrl(shortUrl);

            if (shortUrlExists) {
                throw new BadRequestException('short url already taken');
            }
        }

        return await this.shortUrlRepository.create(
            id,
            url,
            shortUrl,
            password,
        );
    }

    findAll() {
        return `This action returns all shortUrl`;
    }

    findOne(id: number) {
        return `This action returns a #${id} shortUrl`;
    }

    update(id: number, updateShortUrlDto: UpdateShortUrlDto) {
        return `This action updates a #${id} shortUrl`;
    }

    remove(id: number) {
        return `This action removes a #${id} shortUrl`;
    }
}
