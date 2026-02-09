import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  code: string; 

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string; 
}