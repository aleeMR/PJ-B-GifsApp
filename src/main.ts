import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);
  app.use(cors());
  app.use(helmet());
  app.use(helmet.hidePoweredBy());
  await app.listen(process.env.PORT || 3000);
  logger.log(`Server Listening : ${await app.getUrl()}`);
}

bootstrap();
