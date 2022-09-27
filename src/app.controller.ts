import { Body, Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  indexPage(@Req() req) {
    if (req.session && req.session.username) {
      console.log("UserName", req.session.username);
      console.log("Avatar", req.session.avatar_url);

      return {
        username: req.session.username,
        avatar_url: req.session.avatar_url
      }
    } else {
      console.log("No user id");
      return { username: null }
    }
  }
  
  @Post('api/repos')
  createRepository(@Body() body) {
    this.appService.createRepository(body);
  }

  @Get('auth/logout')
  logoutHandler(@Req() req, @Res() res) {
    req.session.destroy();

    return res.redirect('/');
  }

  @Get('auth/github/login')
  @UseGuards(AuthGuard('github'))
  async googleAuth(@Req() req) {
  }

  @Get('auth/github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req, @Res() res) {
    return this.appService.githubLogin(req, res);
  }
}
