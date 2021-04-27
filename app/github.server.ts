import { bundleMDX } from "mdx-bundler";
import { octokit } from "./octokit.server";

async function downloadFileBySha(sha: string) {
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

async function getFirstMdxFileContent(files: GithubFileOrDir[]) {
  for (let extension of [".mdx", ".md"]) {
    let file = files.find(({ name }) => name.endsWith(extension));
    if (file) {
      let content = await downloadFileBySha(file.sha);
      return content;
    }
  }
}

export interface BundledMdx {
  code: string;
  frontmatter: Record<string, any>;
}

/**
 *
 * @param path The path within repo/content where the mdx resides, for example:
 * `/docs/getting-started`
 */
export async function getBundledMdx(mdxPath: string): Promise<BundledMdx> {
  let { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "FungiRealtime",
      repo: "fungirealti.me",
      path: `content${mdxPath}`,
    }
  );

  if (!Array.isArray(data)) {
    throw new Error(`Invalid path ${mdxPath}, no content was found.`);
  }

  let files = data.filter(({ type }) => type === "file");
  let content = await getFirstMdxFileContent(files);

  if (!content) {
    throw new Error(
      `Invalid path ${mdxPath}, no files with the extension .mdx or .md were found.`
    );
  }

  let { code, frontmatter } = await bundleMDX(content);
  return { code, frontmatter };
}
