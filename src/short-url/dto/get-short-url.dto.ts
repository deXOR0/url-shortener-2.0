import { IsOptional } from 'class-validator';

export class GetShortUrlDto {
    @IsOptional()
    readonly password: string;
}
