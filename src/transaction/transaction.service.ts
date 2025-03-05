import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { MailService } from 'src/mail/mail.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService, private mailService: MailService) {}

  async createTransaction(dto: CreateTransactionDto, sellerId: string) {
    const car = await this.prisma.car.findUnique({
      where: { id: dto.carId },
    });

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    if (car.ownerId !== sellerId) {
      throw new BadRequestException('You are not the owner of this car');
    }

    const buyer = await this.prisma.user.findUnique({
      where: { email: dto.buyerEmail },
    });

    if (!buyer) {
      throw new NotFoundException('Buyer with this email not found');
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        carId: dto.carId,
        sellerId,
        buyerId: buyer.id,
        price: dto.price,
        status: 'pending',
      },
    });

    await this.mailService.sendTransactionInvitation(
      buyer.email,
      car.brand,
      car.model,
      dto.price,
      transaction.id,
    );

    return transaction;
  }

  async getUserTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        OR: [{ sellerId: userId }, { buyerId: userId }],
      },
      include: {
        car: true,
      },
    });
  }

  async confirmTransaction(transactionId: string, userId: string) {
    console.log('🚀 User confirms transaction:', transactionId);
  
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { car: true, seller: true, buyer: true },
    });
  
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
  
    let updatedTransaction;
  
   
    if (transaction.buyerId === userId) {
      updatedTransaction = await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { buyerConfirmed: true },
      });
      console.log('✅ Buyer confirmed the transaction');
    } else if (transaction.sellerId === userId) {
      updatedTransaction = await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { sellerConfirmed: true },
      });
      console.log('✅ Seller confirmed the transaction');
    } else {
      throw new BadRequestException('You are not part of this transaction');
    }
  
    
    if (updatedTransaction.buyerConfirmed && updatedTransaction.sellerConfirmed) {
      console.log('✅ Both parties confirmed, finalizing the transaction...');
  
    
      await this.prisma.car.update({
        where: { id: transaction.carId },
        data: { ownerId: transaction.buyerId },
      });
  
     
      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'confirmed' },
      });
  
      console.log('✅ Car owner updated, sending confirmation emails...');
  
      
      await this.mailService.sendTransactionConfirmation(
        transaction.seller.email,
        'Your car has been sold!',
        transaction.car.brand,
        transaction.car.model,
        transaction.price,
      );
  
      console.log('✅ Email sent to seller:', transaction.seller.email);
  
      
      await this.mailService.sendTransactionConfirmation(
        transaction.buyer.email,
        'Congratulations on your purchase!',
        transaction.car.brand,
        transaction.car.model,
        transaction.price,
      );
  
      console.log('✅ Email sent to buyer:', transaction.buyer.email);
  
      return { message: 'Transaction confirmed, car transferred to the new owner' };
    }
  
    return { message: 'Transaction is pending confirmation from the other party' };
  }
  

  async getTransactionById(transactionId: string) {
    return await this.prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { car: true, seller: true, buyer: true },
    });
  }


  async getUserTransactionsByPsn(psn: string) {
    const user = await this.prisma.user.findUnique({
      where: { psn },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.transaction.findMany({
      where: {
        OR: [{ sellerId: user.id }, { buyerId: user.id }],
      },
      include: {
        car: true,
        seller: { select: { name: true, surname: true, email: true } },
        buyer: { select: { name: true, surname: true, email: true } },
      },
    });
  }

  async updateTransaction(transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id: transactionId },
      data: { price: updateTransactionDto.price },
    });
  }
  
}
