import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  indexPage() {
    return { message : "Hello PrIYMA"};
  }

  @Get('auth/github/login')
  @UseGuards(AuthGuard('github'))
  async googleAuth(@Req() req) {
  }

  @Get('auth/github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req) {
    return this.appService.githubLogin(req);
  }
}
