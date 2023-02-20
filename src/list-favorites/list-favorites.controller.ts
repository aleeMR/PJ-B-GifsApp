import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ListFavoritesService } from './list-favorites.service';
import { CreateListFavoriteDto } from './dto/create-list-favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Payload } from '@core/interface';
import { UserDecorator } from '@core/config/decorators';

@Controller('list-favorites')
export class ListFavoritesController {
  constructor(private readonly listFavoritesService: ListFavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @UserDecorator() userPayload: Payload,
    @Body() createListFavoriteDto: CreateListFavoriteDto,
  ) {
    return this.listFavoritesService.create(userPayload, createListFavoriteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@UserDecorator() userPayload: Payload) {
    return this.listFavoritesService.findAll(userPayload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @UserDecorator() userPayload: Payload) {
    return this.listFavoritesService.remove(id, userPayload);
  }
}
