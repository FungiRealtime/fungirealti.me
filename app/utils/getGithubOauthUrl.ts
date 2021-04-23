export let getGithubOauthUrl = (clientId: string) => {
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/oauth/redirect`;
};
