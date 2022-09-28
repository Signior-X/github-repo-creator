import { Body, Injectable, Req } from '@nestjs/common';
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

  /**
   * Creates a new repository based on the RepoRequest object
   * @param req - Request object
   * @param body - RepoRequest object to create new repo
   * @returns 
   */
  async createRepository(@Req() req,@Body() body: RepoRequest) : Promise<RepoResponse> {
    // Data will automatically come validated from class-validator
    console.log("Create a repository", body);

    // Final response object that is going to be sent
    const repoResponse = new RepoResponse();

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

    let result = await axios({
      method: 'post',
      url: url,
      data: data,
      headers: headers
    }).then(data => {
      repoResponse.status = true;
      repoResponse.description = data ? JSON.stringify(data.data) : "";

      return repoResponse;
    }).catch(err => {
      // Repo creation failure or something wrong happened
      repoResponse.status = false;

      if (err && err.response && err.response.data) {
        const errorResponseData = err.response.data;
        repoResponse.err = JSON.stringify(errorResponseData);
      } else {
        // WE can't predict the error in this case
        repoResponse.err = JSON.stringify(err);
      }

      return repoResponse;
    });

    return repoResponse;
  }
}
