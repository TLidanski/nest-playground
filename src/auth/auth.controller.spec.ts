import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn().mockImplementation((authCredentialsDto: AuthCredentialsDTO) => {
                            return {accessToken: ''}
                        })
                    }
                }
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should return access token in its body', async () => {
            const credentials: AuthCredentialsDTO = {username: 'username', password: 'pwd'};
            const res = await controller.login(credentials);
            expect(res.accessToken).toBeDefined();
            expect(service.login).toHaveBeenCalledWith(credentials);
        });
    });
});
