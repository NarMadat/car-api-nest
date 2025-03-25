import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        phone: true,
        psn: true,
        year: true,
        middle_name: true,
        citizenship: true,
        country: true,
        region: true,
        province: true,
        city: true,
        street: true,
        mail_code: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }


  
  async getMaskedUserInfo(psn: string) {
    const user = await this.prisma.user.findUnique({
      where: { psn },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        year: true,
        phone: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: this.maskEmail(user.email),
      name: this.maskName(user.name),
      surname: this.maskName(user.surname),
      phone: this.maskPhone(user.phone),
      year: user.year
    };
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    return `${local.slice(0, 3)}***@${domain}`;
  }

  private maskName(name: string): string {
    if (name.length <= 3) return name; 
    return `${name.slice(0, 3)}***`;
  }

  private maskPhone(phone: string): string {
    return phone.replace(/\d(?=\d{3})/g, '*');
  }
}
