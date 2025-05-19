// controller for shortener, get post method etc

import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { createShortUrlDto } from './dto/create-short-url.dto';

@Controller()
export class ShortenerController {
  constructor(private shortenerService: ShortenerService) {}

  @Post('shorten')
  async shorten(@Body() dto: createShortUrlDto) {
    return this.shortenerService.createShortUrlDto(dto);
  }

  @Get(':shortCode')
  @Redirect()
  async redirect(@Param('shortCode') shortCode: string) {
    const url = await this.shortenerService.getOriginalurl(shortCode);
    return { url };
  }
}
