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
    findAll() {
        return this.shortUrlService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.shortUrlService.findOne(+id);
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
