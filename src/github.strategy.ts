import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-github";
import { Injectable } from "@nestjs/common";


@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        super({
            clientID : "",
            clientSecret : "",
            callbackURL: "http://localhost:5000/auth/github/callback",
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