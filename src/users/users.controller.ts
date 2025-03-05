import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Retrieve authenticated user's profile" })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  getUserProfile(@Req() req) {
    return this.usersService.getUserProfile(req.user.userId);
  }


  @Get(':psn/masked')
  @ApiOperation({ summary: 'Retrieve masked user information by PSN' })
  @ApiResponse({ status: 200, description: 'Masked user information retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getMaskedUserInfo(@Param('psn') psn: string) {
    return this.usersService.getMaskedUserInfo(psn);
  }
}
