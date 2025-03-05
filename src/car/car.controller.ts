import { 
  Controller, Post, 
  Get, Body, 
  Req, UsePipes, 
  ValidationPipe, UseGuards, 
  UnauthorizedException
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Vehicles')
@ApiBearerAuth()
@Controller('api/v1/vehicles') 
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Add a new vehicle' })
  @ApiResponse({ status: 201, description: 'Vehicle added successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addCar(@Body() dto: CreateCarDto, @Req() req) {
    const ownerId = req.user?.userId;
    return this.carService.addCar(dto, ownerId);
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Retrieve vehicles of the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of user vehicles retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserCars(@Req() req) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    return this.carService.getUserCars(userId);
  }
}
