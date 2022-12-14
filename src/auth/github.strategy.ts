import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-github";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private config: ConfigService) {
        super({
            clientID : config.get<string>('GITHUB_CLIENT_ID'),
            clientSecret : config.get<string>('GITHUB_CLIENT_SECRET'),
            callbackURL: `${config.get<string>('HOST_URL')}/auth/github/callback`,
			scope: ['repo'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any,
        done: VerifyCallback): Promise<any> {
        // Passport.js handles the sending of accessToken and profile after
        // sucessfully verifying the user
        console.log("Profile got", profile);

        const user = {
            username: profile.username,
            accessToken: accessToken,
            avatar_url: profile._json.avatar_url
        }

        done(null, user);
    }
}