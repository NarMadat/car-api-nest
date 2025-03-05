import { IsString, IsUUID, IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  carId: string;

  @IsString()
  buyerEmail: string; 

  @IsNumber()
  @IsPositive()
  price: number;
}
