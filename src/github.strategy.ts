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
        console.log("PROFILE GOT", profile);

        const user = {
            id: "1"
        }

        console.log("Access token", accessToken);
        console.log("Refresh token", refreshToken);

        done(null, user);
    }
}