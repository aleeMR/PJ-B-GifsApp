import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { app: 'API-GifApp Version 1.0' };
  }
}
