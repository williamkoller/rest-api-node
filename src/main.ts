import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');

  await app.listen(port, async () =>
    logger.log(`Server running at: ${await app.getUrl()}`),
  );
}
bootstrap();
