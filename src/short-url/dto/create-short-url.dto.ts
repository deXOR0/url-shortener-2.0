import {
    IsAlphanumeric,
    IsNotEmpty,
    IsOptional,
    IsUrl,
    Length,
    Matches,
} from 'class-validator';

export class CreateShortUrlDto {
    @IsUrl()
    @IsNotEmpty()
    readonly url: string;
    @Matches('^[A-Za-z0-9_-]+$')
    @Length(Number(process.env.SHORT_URL_MIN_LENGTH))
    @IsOptional()
    readonly shortUrl: string;
    readonly password: string;
}
