import { PartialType } from '@nestjs/mapped-types';
import { CreateShortUrlDto } from './create-short-url.dto';
import { IsOptional, IsUrl, Length, Matches } from 'class-validator';

export class UpdateShortUrlDto {
    @IsOptional()
    @IsUrl()
    readonly url: string;
    @IsOptional()
    @Matches('^[A-Za-z0-9_-]+$')
    @Length(Number(process.env.SHORT_URL_MIN_LENGTH))
    readonly short_url: string;
    password: string;
}
