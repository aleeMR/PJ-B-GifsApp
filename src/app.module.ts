import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DATABASE,
  MONGO_HOST,
} from '@core/constant';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ListFavoritesModule } from './list-favorites/list-favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get(MONGO_USERNAME);
        const password = configService.get(MONGO_PASSWORD);
        const database = configService.get(MONGO_DATABASE);
        const host = configService.get(MONGO_HOST);

        return {
          uri: `mongodb+srv://${username}:${password}@${host}`,
          dbName: database,
        };
      },
    }),
    UsersModule,
    AuthModule,
    ListFavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
