import { AppService } from './app.service';
import { RepoRequest } from './schema/RepoRequest';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    indexPage(req: any): {
        username: any;
        avatar_url: any;
    } | {
        username: any;
        avatar_url?: undefined;
    };
    createRepo(req: Request, body: RepoRequest): Promise<any>;
    logoutHandler(req: any, res: any): any;
    googleAuth(req: any): Promise<void>;
    githubAuthRedirect(req: any, res: any): any;
}
