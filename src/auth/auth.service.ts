import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(authCredentialsDto: AuthCredentialsDTO): Promise<Object> {
        const {username, password} = authCredentialsDto;
        const user: User = await this.usersService.findByUsername(username);
        if (!user || user.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = {username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
