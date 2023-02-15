import { Injectable } from '@nestjs/common';
import { CreateListFavoriteDto } from './dto/create-list-favorite.dto';
import { UpdateListFavoriteDto } from './dto/update-list-favorite.dto';

@Injectable()
export class ListFavoritesService {
  create(createListFavoriteDto: CreateListFavoriteDto) {
    return 'This action adds a new listFavorite';
  }

  findAll() {
    return `This action returns all listFavorites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listFavorite`;
  }

  update(id: number, updateListFavoriteDto: UpdateListFavoriteDto) {
    return `This action updates a #${id} listFavorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} listFavorite`;
  }
}
