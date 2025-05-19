import { IsNotEmpty, IsNumber, IsOptional, IsUrl, Min } from 'class-validator';

export class createShortUrlDto {
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  expiryDays?: number;
}
