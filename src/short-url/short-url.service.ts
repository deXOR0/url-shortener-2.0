import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { ShortUrlRepository } from './short-url.repository';
import { customAlphabet } from 'nanoid';
import { hash, compare } from 'bcryptjs';
import { GetShortUrlDto } from './dto/get-short-url.dto';

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

        if (password) {
            password = await hash(password, 10);
        }

        return await this.shortUrlRepository.create(
            id,
            url,
            shortUrl,
            password,
        );
    }

    async findAll(req) {
        const { user } = req;
        const { id } = user;
        const shortUrls = await this.shortUrlRepository.getAllShortUrls(id);

        return {
            data: {
                shortUrls,
            },
        };
    }

    async maskShortUrlPassword(shortUrl) {
        return {
            ...shortUrl,
            password: shortUrl.password ? 'secret' : shortUrl.password,
        };
    }

    async findOne(shortUrl: string) {
        const url = await this.shortUrlRepository.getShortUrl(shortUrl);

        return {
            data: await this.maskShortUrlPassword(url),
        };
    }

    async getUrl(shortUrl: string, getShortUrlDto: GetShortUrlDto) {
        const { password } = getShortUrlDto;

        const url = await this.shortUrlRepository.getShortUrl(shortUrl);

        if (url.password) {
            if (!password) {
                throw new UnauthorizedException(
                    'password is required to access this link',
                );
            }
            const isPasswordValid = await compare(password, url.password);

            if (!isPasswordValid) {
                throw new UnauthorizedException('invalid password');
            }
        }

        await this.shortUrlRepository.addClicks(shortUrl, url.clicks);

        return { data: { url: url.url } };
    }

    update(id: number, updateShortUrlDto: UpdateShortUrlDto) {
        return `This action updates a #${id} shortUrl`;
    }

    remove(id: number) {
        return `This action removes a #${id} shortUrl`;
    }
}
