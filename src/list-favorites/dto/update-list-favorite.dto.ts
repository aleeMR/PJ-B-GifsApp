import { PartialType } from '@nestjs/mapped-types';
import { CreateListFavoriteDto } from './create-list-favorite.dto';

export class UpdateListFavoriteDto extends PartialType(CreateListFavoriteDto) {}
