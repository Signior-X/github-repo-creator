import { Body, Controller, Get, Post, Render, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { RepoRequest } from './schema/RepoRequest';

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
  async createRepo(@Req() req: Request, @Body() body: RepoRequest): Promise<any> {
    return await this.appService.createRepository(req, body);
  }
}
