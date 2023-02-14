import { Module } from '@nestjs/common';
import { ListFavoritesService } from './list-favorites.service';
import { ListFavoritesController } from './list-favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ListFavorite,
  ListFavoriteSchema,
} from './entities/list-favorite.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ListFavorite.name,
        schema: ListFavoriteSchema,
      },
    ]),
  ],
  controllers: [ListFavoritesController],
  providers: [ListFavoritesService],
})
export class ListFavoritesModule {}
