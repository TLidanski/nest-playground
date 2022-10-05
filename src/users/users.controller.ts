import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserDTO } from './dto/create.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() userDTO: UserDTO): Promise<User> {
        return this.usersService.create(userDTO);
    }
}
