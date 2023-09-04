import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsInt } from 'class-validator';

export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
