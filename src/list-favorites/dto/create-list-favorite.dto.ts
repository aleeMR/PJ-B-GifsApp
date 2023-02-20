import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListFavoriteDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
