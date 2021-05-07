import nodePath from "path";
import { octokit } from "./octokit.server";
import type { GitHubFile, GithubFileOrDir, Section, Tree } from "../types";

let repo = {
  owner: "FungiRealtime",
  name: "fungirealti.me",
};

/**
 *
 * @param path the full path to list
 * @returns a promise that resolves to a file ListItem of the files/directories in the given directory (not recursive)
 */
async function downloadDirList(path: string) {
  let { data } = await octokit.repos.getContent({
    owner: repo.owner,
    repo: repo.name,
    path,
  });

  if (!Array.isArray(data)) {
    throw new Error(
      `Tried to download content from ${path}. GitHub did not return an array of files. This should never happen...`
    );
  }

  return data;
}

/**
 *
 * @param sha the hash for the file (retrieved via `downloadDirList`)
 * @returns a promise that resolves to a string of the contents of the file
 */
async function downloadFileBySha(sha: string) {
  let { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
    {
      owner: repo.owner,
      repo: repo.name,
      file_sha: sha,
    }
  );

  let encoding = data.encoding as Parameters<typeof Buffer.from>["1"];
  return Buffer.from(data.content, encoding).toString();
}

async function downloadFirstMdxFile(
  list: Array<{ name: string; type: string; path: string; sha: string }>
) {
  let filesOnly = list.filter(({ type }) => type === "file");
  for (let extension of [".mdx", ".md"]) {
    let file = filesOnly.find(({ name }) => name.endsWith(extension));
    if (file) {
      return downloadFileBySha(file.sha);
    }
  }
  return null;
}

/**
 *
 * @param dir the directory to download.
 * This will recursively download all content at the given path.
 * @returns An array of file paths with their content
 */
async function downloadDirectory(dir: string): Promise<Array<GitHubFile>> {
  let dirList = await downloadDirList(dir);

  let result = await Promise.all(
    dirList.map(async ({ path: fileDir, type, sha }) => {
      switch (type) {
        case "file": {
          let content = await downloadFileBySha(sha);
          return { path: fileDir, content };
        }
        case "dir": {
          return downloadDirectory(fileDir);
        }
        default: {
          throw new Error(`Unexpected repo file type: ${type}`);
        }
      }
    })
  );

  return result.flat();
}

/**
 *
 * @param mdxFileOrDirectory the path to the content. For example:
 * content/docs/something/index.mdx (pass "docs/something")
 * @returns A promise that resolves to an Array of GitHubFiles for the necessary files
 */
export async function downloadMdxFileOrDirectory(
  relativeMdxFileOrDirectory: string
): Promise<Array<GitHubFile>> {
  let mdxFileOrDirectory = `content/${relativeMdxFileOrDirectory}`;
  let parentDir = nodePath.dirname(mdxFileOrDirectory);
  let dirList = await downloadDirList(parentDir);

  let basename = nodePath.basename(mdxFileOrDirectory);

  let potentials = dirList.filter(({ name }) => {
    let matchesWithPrefix = new RegExp(`\\d+-${basename}`).test(name);

    if (!matchesWithPrefix) {
      return name.startsWith(basename);
    }

    return matchesWithPrefix;
  });

  if (potentials.length === 0) return [];

  let content = await downloadFirstMdxFile(potentials);
  // /content/about.mdx => entry is about.mdx, but compileMdx needs
  // the entry to be called "/content/index.mdx" so we'll set it to that
  // because this is the entry for this path
  if (content) {
    return [{ path: nodePath.join(potentials[0].path, "index.mdx"), content }];
  }

  let directory = potentials.find(({ type }) => type === "dir");
  if (!directory) return [];

  return downloadDirectory(potentials[0].path);
}

export function removeNumberPrefix(str: string, separator: string) {
  let parts = str.split(separator);
  let hasNumberPrefix = /^\d+$/.test(parts[0]);
  if (!hasNumberPrefix) {
    return str;
  }

  let [, ...partsWithoutPrefix] = parts;
  return partsWithoutPrefix.join(separator);
}

function prettifyDirName(str: string) {
  let withoutHyphens = str.replace(/-/g, " ");
  return withoutHyphens.charAt(0).toUpperCase() + withoutHyphens.slice(1);
}

/**
 *
 * @returns A promise that resolves to the docs sections.
 */
export async function getDocsSections() {
  let { data: filesOrDirs } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: repo.owner,
      repo: repo.name,
      path: "content",
    }
  );

  let docsTreeSha = (filesOrDirs as GithubFileOrDir[]).find(
    (fileOrDir) => fileOrDir.name === "docs"
  )!.sha;

  let { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1",
    {
      owner: "FungiRealtime",
      repo: "fungirealti.me",
      tree_sha: docsTreeSha,
    }
  );

  let trees = data.tree as Tree[];
  let sections: Section[] = Object.entries(
    trees.reduce((acc, tree) => {
      let paths = tree.path.split("/");
      let isTree = paths.length === 1 && tree.type === "tree";

      if (isTree) {
        let leafs = trees.filter(({ path, type }) => {
          let leafPaths = path.split("/");
          return (
            leafPaths.length === 2 &&
            leafPaths[0] === tree.path &&
            type === "tree"
          );
        });

        return {
          ...acc,
          [tree.path]: leafs.map((leaf) => {
            let leafPaths = leaf.path.split("/");
            return leafPaths[leafPaths.length - 1];
          }),
        };
      }

      return acc;
    }, {} as Record<string, string[]>)
  ).map(([tree, leafs]) => {
    let withoutNumberPrefixTree = removeNumberPrefix(tree, "-");

    return {
      title: prettifyDirName(withoutNumberPrefixTree),
      pathname: `/docs/${withoutNumberPrefixTree}`,
      subsections: leafs.map((leaf) => {
        let withoutNumberPrefixLeaf = removeNumberPrefix(leaf, "-");
        return {
          title: prettifyDirName(withoutNumberPrefixLeaf),
          pathname: `/docs/${withoutNumberPrefixTree}/${withoutNumberPrefixLeaf}`,
        };
      }),
    };
  });

  return sections;
}
