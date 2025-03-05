import { IsString, IsInt, IsPositive } from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsInt()
  @IsPositive()
  year: number;

  @IsPositive()
  price: number;
}
