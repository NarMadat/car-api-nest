import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CarService, PrismaService],
  controllers: [CarController]
})
export class CarModule {}
