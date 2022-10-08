import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/create.user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

    async create(userDTO: UserDTO): Promise<User> {
        const user: User = this.usersRepo.create(userDTO);
        return await this.usersRepo.save(user);
    } 

    async findByUsername(username: string) : Promise<User | undefined> {
        return await this.usersRepo.findOneBy({username});
    }
}
