import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';

@Module({
  providers: [AuthService, GithubStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
