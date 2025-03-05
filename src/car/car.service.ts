import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async addCar(dto: CreateCarDto, ownerId: string) {
    return this.prisma.car.create({
      data: {
        brand: dto.brand,
        model: dto.model,
        year: dto.year,
        price: dto.price,
        ownerId,
      },
    });
  }

  async getAllCars() {
    return this.prisma.car.findMany();
  }

  async getUserCars(userId: string) {
    return this.prisma.car.findMany({
      where: { ownerId: userId },
    });
  } 
}
