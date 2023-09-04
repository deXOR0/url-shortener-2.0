import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @UsePipes(ValidationPipe)
    register(@Body() authDto: AuthDTO) {
        return this.authService.register(authDto);
    }

    @Post('/login')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    login(@Body() authDto: AuthDTO) {
        return this.authService.login(authDto);
    }
}
