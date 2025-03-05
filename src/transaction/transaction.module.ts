import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [TransactionService, PrismaService, MailService],
  controllers: [TransactionController]
})
export class TransactionModule {}
