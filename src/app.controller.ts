import { Body, Controller, Get, Post, Render, Req, Res, UseGuards, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  indexPage(@Req() req) {
    if (req.cookies && req.cookies.username) {
      console.log("UserName", req.cookies.username);
      console.log("Avatar", req.cookies.avatar_url);

      return {
        username: req.cookies.username,
        avatar_url: req.cookies.avatar_url
      }
    } else {
      console.log("No user id");
      return { username: null }
    }
  }
  
  @Post('api/repos')
  createRepository(@Req() req: Request, @Body() body: Body, @Res() res: Response) {
    console.log("Hello");
    return { hello: "world" };
  }

  @Get('auth/logout')
  logoutHandler(@Req() req, @Res() res) {
    res.clearCookie('username');
    res.clearCookie('accessToken');

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
