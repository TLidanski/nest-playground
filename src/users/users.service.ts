import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/create.user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async create(userDTO: UserDTO): Promise<User> {
        const user: User = this.usersRepository.create(userDTO);
        return await this.usersRepository.save(user);
    } 

    async findByUsername(username: string) : Promise<User | undefined> {
        return await this.usersRepository.findOneBy({username});
    }
}
