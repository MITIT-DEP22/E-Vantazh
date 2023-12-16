import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CustomSwagger } from './custom-swagger.provider';
import * as fs from 'fs';
import * as path from 'path';

const httpsOptions = {
  key: fs.readFileSync(
    path.resolve(new ConfigService().get('SSL_KEY_PATH') || ''),
  ),
  cert: fs.readFileSync(
    path.resolve(new ConfigService().get('SSL_CERT_PATH') || ''),
  ),
};

async function bootstrap() {
  const PORT = new ConfigService().get('PORT');
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  CustomSwagger(app);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap().catch((error) => {
  console.error('Server not started, error:', error);
});
