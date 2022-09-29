"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const RepoResponse_1 = require("./schema/RepoResponse");
let AppService = class AppService {
    githubLogin(req, res) {
        if (!req.user) {
            return 'Github Authentication Failed';
        }
        else {
            res.cookie('accessToken', req.user.accessToken);
            res.cookie('avatar_url', req.user.avatar_url);
            res.cookie('username', req.user.username);
            return res.redirect('/');
        }
    }
    async createRepository(req, body) {
        console.log("Create a repository", body);
        const repoResponse = new RepoResponse_1.RepoResponse();
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
        };
        const headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${accessToken}`
        };
        let result = await (0, axios_1.default)({
            method: 'post',
            url: url,
            data: data,
            headers: headers
        }).then(data => {
            repoResponse.status = true;
            repoResponse.description = data ? JSON.stringify(data.data) : "";
            return repoResponse;
        }).catch(err => {
            repoResponse.status = false;
            if (err && err.response && err.response.data) {
                const errorResponseData = err.response.data;
                repoResponse.err = JSON.stringify(errorResponseData);
            }
            else {
                repoResponse.err = JSON.stringify(err);
            }
            return repoResponse;
        });
        return result;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map