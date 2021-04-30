import "dotenv/config";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITUB_PAT });

export { octokit };
