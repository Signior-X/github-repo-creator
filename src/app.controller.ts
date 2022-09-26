import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async googleAuth(@Req() req) {
  }

  @Get('auth/github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req) {
    return this.appService.githubLogin(req);
  }
}
