import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enabled CORS for the frontend
  app.enableCors({
    origin: [
      'https://url-shortener-iota-eosin.vercel.app',
      'http://localhost:3000',
    ],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
