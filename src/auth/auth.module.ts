import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    providers: [AuthService, JwtStrategy],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: { expiresIn: '60s' },
            }),
            inject: [ConfigService]
        })
    ],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
