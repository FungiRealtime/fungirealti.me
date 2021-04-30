import { octokit } from "./octokit.server";

export interface GithubFileOrDir {
  type: string;
  name: string;
  path: string;
  content?: string | undefined;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
}

export async function downloadFileBySha(sha: string) {
  let { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
    {
      owner: "FungiRealtime",
      repo: "fungirealti.me",
      file_sha: sha,
    }
  );

  let encoding = data.encoding as Parameters<typeof Buffer.from>["1"];
  return Buffer.from(data.content, encoding).toString();
}

export async function getFirstMdxFileContent(files: GithubFileOrDir[]) {
  for (let extension of [".mdx", ".md"]) {
    let file = files.find(({ name }) => name.endsWith(extension));
    if (file) {
      let content = await downloadFileBySha(file.sha);
      return content;
    }
  }
}
