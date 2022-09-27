import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  githubLogin(req, res) {
    if (!req.user) {
      return 'No user from github';
    } else {
      req.session.username = req.user.username;
      req.session.accessToken = req.user.accessToken;
      req.session.avatar_url = req.user.avatar_url;

      return res.redirect('/');
    }
  }

  createRepository(body) {
    console.log("Create a repository", body);

    return { success : true }
  }
}
