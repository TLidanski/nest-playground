import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/create.user.dto';

const userDTO: UserDTO = {username: 'username', password: 'pwd'};
const user: User = new User();
user.id = 1;
user.username = 'username';
user.password = 'pwd';

describe('UsersService', () => {
    let service: UsersService;
    let repo: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            UsersService,
            {
                provide: getRepositoryToken(User),
                useValue: {
                    create: jest.fn(),
                    save: jest.fn(),
                    findOneBy: jest.fn().mockResolvedValue(user)
                }
            }
        ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
});

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a user', async () => {
            jest.spyOn(repo, 'create').mockImplementation(() => user);
            jest.spyOn(repo, 'save').mockResolvedValue(user);
            const res = await service.create(userDTO);
            expect(res).toBe(user);
        });
    });

    describe('findByUsername', () => {
        it('should return a user', () => {
            expect(service.findByUsername('')).resolves.toEqual(user);
        });
    });
});
