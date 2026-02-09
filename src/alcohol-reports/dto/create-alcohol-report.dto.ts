import {
  IsUUID,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateAlcoholReportDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(2000)
  @Max(2100)
  year: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  // Opening
  @IsOptional()
  @IsNumber()
  opening_volume?: number;

  @IsOptional()
  @IsNumber()
  opening_abs?: number;

  // Received
  @IsOptional()
  @IsNumber()
  received_volume?: number;

  @IsOptional()
  @IsNumber()
  received_abs?: number;

  // Consumed
  @IsOptional()
  @IsNumber()
  consumed_volume?: number;

  @IsOptional()
  @IsNumber()
  consumed_abs?: number;

  // Produced
  @IsOptional()
  @IsNumber()
  produced_volume?: number;

  @IsOptional()
  @IsNumber()
  produced_abs?: number;

  // Sold (local)
  @IsOptional()
  @IsNumber()
  sold_volume?: number;

  @IsOptional()
  @IsNumber()
  sold_abs?: number;

  @IsOptional()
  @IsNumber()
  sold_sum?: number;

  // Export
  @IsOptional()
  @IsNumber()
  export_volume?: number;

  @IsOptional()
  @IsNumber()
  export_abs?: number;

  @IsOptional()
  @IsNumber()
  export_sum?: number;

  // Loss & own use
  @IsOptional()
  @IsNumber()
  loss_volume?: number;

  @IsOptional()
  @IsNumber()
  own_use_volume?: number;

  // Closing(automatically calculated)
  @IsOptional()
  @IsNumber()
  closing_volume?: number;

  @IsOptional()
  @IsNumber()
  closing_abs?: number;
}
