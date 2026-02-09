import { IsUUID, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateAlcoholReportDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1900)
  @Max(2100)
  year: number;

  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @IsOptional()
  @IsNumber()
  produced_volume?: number;

  @IsOptional()
  @IsNumber()
  sold_volume?: number;

  @IsOptional()
  @IsNumber()
  sold_sum?: number;
}
