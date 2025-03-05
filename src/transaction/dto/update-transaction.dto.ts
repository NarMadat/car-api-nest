import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTransactionDto {
  @IsNumber()
  @IsOptional()
  price?: number;
}
