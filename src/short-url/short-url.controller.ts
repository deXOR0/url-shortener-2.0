import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Request,
    Put,
} from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { GetShortUrlDto } from './dto/get-short-url.dto';

@Controller('short-url')
export class ShortUrlController {
    constructor(private readonly shortUrlService: ShortUrlService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    create(@Request() req, @Body() createShortUrlDto: CreateShortUrlDto) {
        return this.shortUrlService.create(req, createShortUrlDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    findAll(@Request() req) {
        return this.shortUrlService.findAll(req);
    }

    @Get(':shortUrl/detail')
    @UseGuards(JwtAuthGuard)
    findOne(@Request() req, @Param('shortUrl') shortUrl: string) {
        return this.shortUrlService.findOne(req, shortUrl);
    }

    @Get(':shortUrl')
    @UsePipes(ValidationPipe)
    async getUrl(
        @Param('shortUrl') shortUrl: string,
        @Body() getShortUrlDto: GetShortUrlDto,
    ) {
        return await this.shortUrlService.getUrl(shortUrl, getShortUrlDto);
    }

    @Put(':shortUrl')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    async update(
        @Request() req,
        @Param('shortUrl') shortUrl: string,
        @Body() updateShortUrlDto: UpdateShortUrlDto,
    ) {
        return await this.shortUrlService.update(
            req,
            shortUrl,
            updateShortUrlDto,
        );
    }

    @Delete(':shortUrl')
    @UseGuards(JwtAuthGuard)
    async remove(@Request() req, @Param('shortUrl') shortUrl: string) {
        return await this.shortUrlService.remove(req, shortUrl);
    }
}
