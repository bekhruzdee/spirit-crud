import { IsString, IsNotEmpty, Length, IsIn } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Spirit', 'Distillat', 'Vinomaterial', 'SemiFinished', 'Aroq'])
  type: 'Spirit' | 'Distillat' | 'Vinomaterial' | 'SemiFinished' | 'Aroq';
}
