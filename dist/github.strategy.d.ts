import { VerifyCallback } from "passport-github";
import { ConfigService } from "@nestjs/config";
declare const GithubStrategy_base: new (...args: any[]) => any;
export declare class GithubStrategy extends GithubStrategy_base {
    private config;
    constructor(config: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
