import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class UpdatePasswordDTO {
    @IsString()
    @IsNotEmpty()
    readonly oldPassword: string;
    @IsString()
    @IsNotEmpty()
    readonly newPassword: string;
}
