import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/jwt.guard';
import { AppService } from './app.service';

// Optional DTOs for response typing
interface PingResponse {
  status: string;
  message: string;
  time: string;
}

interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
  service: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // JWT-protected profile route
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request & { user: any }) {
    return req.user;
  }

  // Simple hello route
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Ping endpoint
  @Get('ping')
  ping(): PingResponse {
    return {
      status: 'ok',
      message: 'pong 🏓',
      time: new Date().toISOString(),
    };
  }

  // Health check endpoint
  @Get('health')
  health(): HealthResponse {
    return {
      status: 'healthy',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      service: 'task-manager',
    };
  }
}
