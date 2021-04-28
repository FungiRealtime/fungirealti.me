import { json } from "@remix-run/node";
import { LoaderFunction, useRouteData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { BundledMdx, getBundledMdx } from "../../github.server";

export let loader: LoaderFunction = async ({ params }) => {
  let bundledMdx = await getBundledMdx(
    `/docs/${params.section}/${params.subsection}`
  );

  return json(bundledMdx);
};

export default function DocsPage() {
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
