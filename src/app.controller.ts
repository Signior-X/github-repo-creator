import { Body, Controller, Get, Post, Render, Req, Res, UseGuards, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { RepoRequest } from './schema/RepoRequest';
import { RepoResponse } from './schema/RepoResponse';
import { Repo } from './schema/Repo';

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

  @Get('api/repos')
  getAllRepose(@Req() req: Request): [Repo] | any {
    return this.appService.getAllRepos(req);
  }
  
  @Post('api/repos')
  async createRepo(@Req() req: Request, @Body() body: RepoRequest): Promise<RepoResponse> {
    return await this.appService.createRepository(req, body);
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
    // Handled by passport itself
  }

  @Get('auth/github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req, @Res() res) {
    return this.appService.githubLogin(req, res);
  }
}
