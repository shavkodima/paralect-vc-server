import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandingError } from './HandindError/HandingError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HandingError());
  await app.listen(3000);
}
bootstrap();
