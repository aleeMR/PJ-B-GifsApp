import { Test, TestingModule } from '@nestjs/testing';
import { ListFavoritesController } from './list-favorites.controller';
import { ListFavoritesService } from './list-favorites.service';

describe('ListFavoritesController', () => {
  let controller: ListFavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListFavoritesController],
      providers: [ListFavoritesService],
    }).compile();

    controller = module.get<ListFavoritesController>(ListFavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
