import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

}