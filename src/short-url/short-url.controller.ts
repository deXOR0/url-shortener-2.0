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
    findOne(@Param('shortUrl') shortUrl: string) {
        return this.shortUrlService.findOne(shortUrl);
    }

    @Get(':shortUrl')
    @UsePipes(ValidationPipe)
    async getUrl(
        @Param('shortUrl') shortUrl: string,
        @Body() getShortUrlDto: GetShortUrlDto,
    ) {
        return await this.shortUrlService.getUrl(shortUrl, getShortUrlDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateShortUrlDto: UpdateShortUrlDto,
    ) {
        return this.shortUrlService.update(+id, updateShortUrlDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.shortUrlService.remove(+id);
    }
}
