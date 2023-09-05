import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './dto/create-auth.dto';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async register(authDto: AuthDTO) {
        const { email, password } = authDto;

        const hashedPassword = await hash(password, 10);

        const { id, created_at, updated_at } =
            await this.userRepository.register(email, hashedPassword);

        return {
            data: {
                id,
                email,
                password: 'secret',
                created_at,
                updated_at,
            },
        };
    }

    async login(authDto: AuthDTO) {
        const { email, password } = authDto;

        const user = await this.userRepository.getByEmail(email);

        if (user) {
            const isPasswordValid = await compare(password, user.password);
            if (isPasswordValid) {
                return {
                    data: {
                        access_token: this.jwtService.sign({
                            email,
                        }),
                    },
                };
            }
        }

        throw new UnauthorizedException('invalid username or password');
    }
}
