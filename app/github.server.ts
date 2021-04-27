import { octokit } from "./octokit.server";

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
