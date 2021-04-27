import { json, LoaderFunction } from "@remix-run/node";
import { useRouteData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { getBundledMdx, BundledMdx } from "../../github.server";

export let loader: LoaderFunction = async () => {
  // let bundledMdx = await getBundledMdx("/docs/getting-started");
  return json({ code: "", frontmatter: {} });
};

export default function GettingStarted() {
  let { code, frontmatter } = useRouteData<BundledMdx>();
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
