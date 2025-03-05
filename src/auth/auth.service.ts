import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { psn: dto.psn },
    });

    if (existingUser) throw new ConflictException('User already exist');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        surname: dto.surname,
        phone: dto.phone,
        psn: dto.psn,
      },
    });

    return { message: 'User registered' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { psn: dto.psn },
    });

    if (!user) throw new UnauthorizedException('Incorrect PSN or password');
    
    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) throw new UnauthorizedException('Incorrect PSN or password');
    

    const token = this.jwtService.sign({ userId: user.id, psn: user.psn });

    return { token };
  }


  
}
