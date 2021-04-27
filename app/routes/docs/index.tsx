import { json, LoaderFunction } from "@remix-run/node";
import { useRouteData } from "@remix-run/react";
import { bundleMDX } from "../../mdx.server";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { downloadFileBySha } from "../../github.server";
import { octokit } from "../../octokit.server";

export let loader: LoaderFunction = async () => {
  let content: string | null = null;
  let { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "FungiRealtime",
      repo: "fungirealti.me",
      path: "content/docs/getting-started",
    }
  );

  if (!Array.isArray(data)) {
    return json({ code: "", frontmatter: {} }, { status: 500 });
  }

  let filesOnly = data.filter(({ type }) => type === "file");
  for (let extension of [".mdx", ".md"]) {
    let file = filesOnly.find(({ name }) => name.endsWith(extension));
    if (file) {
      content = await downloadFileBySha(file.sha);
    }
  }

  if (content) {
    let { code, frontmatter } = await bundleMDX(content);
    return { code, frontmatter };
  }

  return json({ code: "", frontmatter: {} });
};

interface RouteData {
  code: string;
  frontmatter: {
    [key: string]: any;
  };
}

export default function DocsIndex() {
  let { code, frontmatter } = useRouteData<RouteData>();
  let Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <header>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
      </header>
      <main>
        <Component />
      </main>
    </>
  );
}
