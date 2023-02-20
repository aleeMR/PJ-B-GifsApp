import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payload, Response } from '@core/interface';
import { CreateListFavoriteDto } from './dto/create-list-favorite.dto';
import { ListFavorite } from './entities/list-favorite.entity';
import { MSG_OK } from '@core/constant';

@Injectable()
export class ListFavoritesService {
  private readonly logger = new Logger(ListFavoritesService.name);
  constructor(
    @InjectModel(ListFavorite.name)
    private readonly listFavoriteModel: Model<ListFavorite>,
  ) {}

  async create(
    userPayload: Payload,
    createListFavoriteDto: CreateListFavoriteDto,
  ): Promise<Response> {
    try {
      await this.listFavoriteModel.findOneAndUpdate(
        {
          userEmail: userPayload.email,
          url: createListFavoriteDto.url,
          title: createListFavoriteDto.title,
          id: createListFavoriteDto.id,
        },
        {
          id: createListFavoriteDto.id,
        },
        {
          new: true,
          upsert: true,
        },
      );
    } catch (error) {
      this.logger.error({ message: 'Error to add list favorites', error });
      throw new InternalServerErrorException('Error to add list favorites');
    }

    return { message: MSG_OK, info: 'Add successfully to list favorites' };
  }

  async findAll(userPayload: Payload): Promise<ListFavorite[]> {
    return this.listFavoriteModel.find(
      { userEmail: userPayload.email },
      {
        __v: 0,
      },
    );
  }

  async remove(id: string , userPayload : Payload): Promise<Response> {
    this.logger.log(`Removing list favorite id : ${id}`);
    try {
      await this.listFavoriteModel.findOneAndDelete({ _id: id , userEmail : userPayload.email  });
    } catch (error) {
      this.logger.error({
        message: 'Error remove gif of list favorites',
        error,
      });
      throw new InternalServerErrorException(
        'Error remove gif of list favorites',
      );
    }

    return { message: MSG_OK, info: 'Remove successfully to list favorites' };
  }
}
