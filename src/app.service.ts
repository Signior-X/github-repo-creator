import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  githubLogin(req, res) {
    if (!req.user) {
      return 'Github Authentication Failed';
    } else {
      req.session.username = req.user.username;
      req.session.accessToken = req.user.accessToken;
      req.session.avatar_url = req.user.avatar_url;

      return res.redirect('/');
    }
  }

  createRepository(req, body) {
    return body;

    console.log("Create a repository", body);

    const accessToken = req.session.accessToken;
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
      body: JSON.stringify(body)
    }

    axios({
      method: 'post',
      url: url,
      data: data,
      headers: headers
    }).then(data => {
      console.log(data);
      return { success: true, data: data.data };
    }).catch(err => {
      console.log("Error came", err)
      return { success: false, err: "Something Went Wrong." }
    });
  }
}
