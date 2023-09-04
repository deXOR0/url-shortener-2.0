import {
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UpdatePasswordDTO } from './dto/update-password-dto';
import { hash, compare } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { response } from 'express';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getCurrentUser(req: any) {
        const { user } = req;
        const { id, email, created_at, updated_at } = user;
        return {
            data: {
                id,
                email,
                created_at,
                updated_at,
            },
        };
    }

    async updatePassword(req: any, updatePasswordDto: UpdatePasswordDTO) {
        const { user } = req;
        const { id, password } = user;
        const { oldPassword, newPassword } = updatePasswordDto;

        const isPasswordTheSame = oldPassword === newPassword;

        if (isPasswordTheSame) {
            throw new HttpException(
                'new password cannot be the same as old password',
                400,
            );
        }

        const isPasswordValid = await compare(oldPassword, password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('invalid password');
        }

        const hashedPassword = await hash(newPassword, 10);

        return await this.userRepository.updatePassword(id, hashedPassword);
    }
}
