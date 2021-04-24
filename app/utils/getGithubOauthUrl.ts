import { getDomain } from "./domain";

export let getGithubOauthUrl = (clientId: string) => {
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${getDomain()}/oauth/redirect`;
};
