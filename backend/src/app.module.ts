import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShortenerModule } from './shortener/shortener.module';

@Module({
  imports: [PrismaModule, ShortenerModule],
})
export class AppModule {}
