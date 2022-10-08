import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() authCredentialsDto: AuthCredentialsDTO): Promise<{accessToken: string}> {
        return this.authService.login(authCredentialsDto);
    }
}
