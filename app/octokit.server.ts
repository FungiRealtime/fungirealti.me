import "dotenv/config";
import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITUB_PAT });

export { octokit };
