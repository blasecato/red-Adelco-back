import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get('ConfigService').envConfig;

  app.enableCors();
  /* await app.listen(3001); */

  const port = process.env.PORT || configService.APP_PORT || '3001'

  await app.listen(port, '0.0.0.0');
  console.log(`Server running on ${configService.APP_HOST_SERVER}:${port}/`);

}
bootstrap();
