import { RepoRequest } from './schema/RepoRequest';
import { RepoResponse } from './schema/RepoResponse';
export declare class AppService {
    githubLogin(req: any, res: any): any;
    createRepository(req: any, body: RepoRequest): Promise<RepoResponse>;
}
