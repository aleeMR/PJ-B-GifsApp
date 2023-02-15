import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListFavoritesService } from './list-favorites.service';
import { CreateListFavoriteDto } from './dto/create-list-favorite.dto';
import { UpdateListFavoriteDto } from './dto/update-list-favorite.dto';

@Controller('list-favorites')
export class ListFavoritesController {
  constructor(private readonly listFavoritesService: ListFavoritesService) {}

  @Post()
  create(@Body() createListFavoriteDto: CreateListFavoriteDto) {
    return this.listFavoritesService.create(createListFavoriteDto);
  }

  @Get()
  findAll() {
    return this.listFavoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listFavoritesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListFavoriteDto: UpdateListFavoriteDto) {
    return this.listFavoritesService.update(+id, updateListFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listFavoritesService.remove(+id);
  }
}
