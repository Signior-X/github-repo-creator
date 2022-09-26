import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  githubLogin(req) {
    if (!req.user) {
      return 'No user from github';
    } else {
      return {
        message: "Usr info from github",
        user: req.user
      }
    }
  }
}
