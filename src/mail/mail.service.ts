import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTransactionInvitation(
    recipient: string,
    carBrand: string,
    carModel: string,
    price: number,
    transactionId: string,
  ) {
    const transactionLink = `http://localhost:3000/api/v1/transactions/session/${transactionId}`;

    await this.mailerService.sendMail({
      to: recipient,
      subject: 'Դուք հրավիրվել եք գործարքի!',
      template: './transaction-invitation',
      context: {
        carBrand,
        carModel,
        price,
        transactionLink,
      },
    });
  }

  async sendTransactionConfirmation(
    recipient: string,
    subject: string,
    carBrand: string,
    carModel: string,
    price: number,
  ) {
    await this.mailerService.sendMail({
      to: recipient,
      subject: subject,
      template: './transaction-confirmation',
      context: {
        carBrand,
        carModel,
        price,
      },
    });
  }
}
