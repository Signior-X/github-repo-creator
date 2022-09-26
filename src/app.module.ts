import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GithubStrategy],
})
export class AppModule {}
