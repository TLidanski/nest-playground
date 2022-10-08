import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from './dto/create.user.dto';

const userDTO: UserDTO = {username: 'username', password: 'pwd'};
const user: User = new User();
user.id = 1;
user.username = 'username';
user.password = 'pwd';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
            provide: UsersService,
            useValue: {
                create: jest.fn().mockImplementation((userDTO: UserDTO) => Promise.resolve(user))
            }
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return the new user as response', () => {
        expect(controller.create(userDTO)).resolves.toEqual(user);
        expect(service.create).toHaveBeenCalledWith(userDTO);
    });
  });
});
