import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RepoRequest } from './schema/RepoRequest';
import { RepoResponse } from './schema/RepoResponse';

@Injectable()
export class AppService {
  githubLogin(req, res) {
    if (!req.user) {
      return 'Github Authentication Failed';
    } else {
      res.cookie('accessToken', req.user.accessToken);
      res.cookie('avatar_url', req.user.avatar_url);
      res.cookie('username', req.user.username);

      return res.redirect('/');
    }
  }

  async createRepository(req, body: RepoRequest) : Promise<RepoResponse> {
    console.log("Create a repository", body);

    const accessToken = req.cookies.accessToken;
    console.log("Access Token", accessToken);

    const url = "https://api.github.com/user/repos";
    const data = {
      "name": `${body.repoName}`,
      "description": "Repo created from Github API",
      "homepage": "https://github.com",
      "private": `${body.repoPrivate}`,
      "auto_init": true,
      "gitignore_template": "nanoc"
    }

    const headers = {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${accessToken}`
    }

    let params: RequestInit = {
      headers: headers,
      method: "POSt",
      body: JSON.stringify(data)
    }

    let result = await axios({
      method: 'post',
      url: url,
      data: data,
      headers: headers
    }).catch(err => {
      // TODO Handle error properly here
      console.log(err);
    });
    
    const repoResponse = new RepoResponse();
    repoResponse.status = true;
    repoResponse.description = "Repo Successfully Created: " + JSON.stringify(data)
    return repoResponse;
  }
}
