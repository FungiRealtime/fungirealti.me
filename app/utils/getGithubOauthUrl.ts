import { getDomain } from "./domain";

export let getGithubOauthUrl = (clientId: string, nextPath?: string) => {
  let url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${getDomain()}/oauth/redirect`;

  if (nextPath) {
    url += `?next=${nextPath}`;
  }

  return url;
};
