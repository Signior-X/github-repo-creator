import  { IsNotEmpty, IsBoolean } from "class-validator";

export class RepoRequest {
    @IsNotEmpty()
    repoName: string;       // Repository name to be created

    @IsBoolean()
    repoPrivate: boolean;   // To keep repo private or not?
}
