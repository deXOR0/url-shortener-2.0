import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    Put,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdatePasswordDTO } from './dto/update-password-dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@Request() req: any) {
        return await this.userService.getCurrentUser(req);
    }

    @Put()
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updatePassword(
        @Request() req: any,
        @Body() updatePasswordDto: UpdatePasswordDTO,
    ) {
        return await this.userService.updatePassword(req, updatePasswordDto);
    }
}
