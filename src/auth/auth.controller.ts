import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('logout')
    logoutHandler(@Req() req, @Res() res) {
      res.clearCookie('username');
      res.clearCookie('accessToken');
  
      return res.redirect('/');
    }
  
    @Get('github/login')
    @UseGuards(AuthGuard('github'))
    async googleAuth(@Req() req) {
      // Handled by passport itself
    }
  
    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    githubAuthRedirect(@Req() req, @Res() res) {
      return this.authService.githubLogin(req, res);
    }
}
