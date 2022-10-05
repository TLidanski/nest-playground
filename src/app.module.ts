import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import configurations from './config/configurations';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configurations]
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'nest-playground',
			synchronize: true,
			autoLoadEntities: true
		}),
		UsersModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
// 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