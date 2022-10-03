import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    /**
     * Handles cookies and session after successfull github login
     * @param req - Request made for github login.
     * @param res - Response based on req.user object from passport
     * @returns Redirects the user to the home page
     */
    githubLogin(req: any, res: any) {
        if (!req.user) {
            return 'Github Authentication Failed';
        } else {
            res.cookie('accessToken', req.user.accessToken);
            res.cookie('avatar_url', req.user.avatar_url);
            res.cookie('username', req.user.username);

            return res.redirect('/');
        }
    }
}
