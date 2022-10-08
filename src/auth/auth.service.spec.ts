import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        secret: configService.get<string>('jwt.secret'),
                        signOptions: { expiresIn: '60s' },
                    }),
                    inject: [ConfigService]
                })
            ],
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {}
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('login', () => {
        let service: AuthService;
        let usersService: UsersService;

        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    PassportModule,
                    JwtModule.registerAsync({
                        imports: [ConfigModule],
                        useFactory: async (configService: ConfigService) => ({
                            secret: `${configService.get<string>('jwt.secret')}`,
                            signOptions: { expiresIn: '60s' },
                        }),
                        inject: [ConfigService]
                    })
                ],
                providers: [
                    AuthService,
                    {
                        provide: UsersService,
                        useValue: {
                            findByUsername: jest.fn()
                        }
                    }
                ],
            }).compile();

            service = module.get<AuthService>(AuthService);
            usersService = module.get<UsersService>(UsersService);
        });

        it('should have an access token defined in its response', async () => {
            const user: User = new User();
            user.username = 'username';
            user.password = 'pwd';
            user.id = 1;
            const credentials: AuthCredentialsDTO = {username: 'username', password: 'pwd'};
            jest.spyOn(usersService, 'findByUsername').mockResolvedValue(user);

            const res = await service.login(credentials);
            expect(res.accessToken).toBeDefined();
        });

        it('should throw UnauthorizedException if no user is found', async () => {
            const credentials: AuthCredentialsDTO = {username: 'username', password: 'pwd'};
            jest.spyOn(usersService, 'findByUsername').mockResolvedValue(undefined);
            await expect(service.login(credentials)).rejects.toThrow(UnauthorizedException);
        });
    });
});
