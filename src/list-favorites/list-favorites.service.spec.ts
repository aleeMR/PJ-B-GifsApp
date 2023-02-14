import { Test, TestingModule } from '@nestjs/testing';
import { ListFavoritesService } from './list-favorites.service';

describe('ListFavoritesService', () => {
  let service: ListFavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListFavoritesService],
    }).compile();

    service = module.get<ListFavoritesService>(ListFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
