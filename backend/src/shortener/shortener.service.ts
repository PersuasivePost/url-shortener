// business logic for the shortener

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createShortUrlDto } from './dto/create-short-url.dto';
// import { nanoid } from 'nanoid';

@Injectable()
export class ShortenerService {
  constructor(private prisma: PrismaService) {}

  async createShortUrlDto(dto: createShortUrlDto) {
    const { nanoid } = await import('nanoid'); //
    const shortUrl = nanoid(8); // to generate a short url

    const now = new Date();

    let expiredAt = new Date(now);

    if (!dto.expiryDays || dto.expiryDays === 0) {
      expiredAt = new Date('2099-12-31T23:59:59.999Z'); // lifetime
    } else {
      expiredAt.setDate(now.getDate() + dto.expiryDays);
    }

    const data = await this.prisma.shortUrl.create({
      data: {
        originalUrl: dto.originalUrl,
        shortUrl,
        expiredAt,
      },
    });

    return {
      shortUrl: data.shortUrl,
      originalUrl: data.originalUrl,
      expireAt: data.expiredAt,
    };
  }

  async getOriginalurl(shortCode: string) {
    const data = await this.prisma.shortUrl.findUnique({
      where: {
        shortUrl: shortCode,
      },
    });

    if (!data) throw new NotFoundException('Short URL not found');
    if (new Date() > data.expiredAt)
      throw new NotFoundException('Short URL expired');

    return data.originalUrl;
  }

  async healthCheck() {
    try {
      // Try to fetch one record from the shortUrl table
      await this.prisma.shortUrl.findFirst();
      return { status: 'ok', db: 'ok' };
    } catch (e) {
      return { status: 'ok', db: 'error', error: e.message };
    }
  }
}

// end
