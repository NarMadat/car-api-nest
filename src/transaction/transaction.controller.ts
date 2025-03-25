import { Controller, Post, Get, Patch, Body, Req, UseGuards, UsePipes, ValidationPipe, Param, NotFoundException, Put } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService, 
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createTransaction(@Body() dto: CreateTransactionDto, @Req() req) {
    const sellerId = req.user.userId; 
    return this.transactionService.createTransaction(dto, sellerId);
  }

  @Patch(':id/status/buyer-signed')
  @UseGuards(JwtAuthGuard)
  async confirmTransactionBuyer(@Param('id') transactionId: string, @Req() req) {
    return this.transactionService.confirmTransaction(transactionId, req.user.userId);
  }

  @Patch(':id/status/seller-signed')
  @UseGuards(JwtAuthGuard)
  async confirmTransactionSeller(@Param('id') transactionId: string, @Req() req) {
    return this.transactionService.confirmTransaction(transactionId, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserTransactions(@Req() req) {
    return this.transactionService.getUserTransactions(req.user.userId);
  }


  @Get('session/:transactionId')
  @ApiOperation({ summary: 'Retrieve transaction session' })
  @ApiResponse({ status: 200, description: 'Transaction session retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async getTransactionSession(@Param('transactionId') transactionId: string) {
    const transaction = await this.transactionService.getTransactionById(transactionId);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }


  @Get('user/:psn')
  @ApiOperation({ summary: 'List transactions by user PSN' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserTransactionsByPsn(@Param('psn') psn: string) {
    return this.transactionService.getUserTransactionsByPsn(psn);
  }

  @Patch(':transactionId')  
  async updateTransaction(
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.updateTransaction(transactionId, updateTransactionDto);
  }

}
