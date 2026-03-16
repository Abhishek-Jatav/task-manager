import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { email, password } = dto;

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.createUser(
      email,
      hashedPassword,
    );

    return {
      message: 'User registered successfully',
      userId: user.id,
    };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}