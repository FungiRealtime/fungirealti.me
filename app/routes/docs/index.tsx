import { LoaderFunction, MetaFunction, json, HeadersFunction } from "remix";
import { useRouteData } from "remix";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { DocsPageNavigation } from "../../components/docs-page-navigation";
import { MdxPage } from "../../types";
import { getMdxPage } from "../../utils/mdx.server";

export let meta: MetaFunction = ({ data }) => {
  let { frontmatter } = data;
  return {
    title: `Fungi Docs`,
    description: frontmatter.description,
  };
};

export let loader: LoaderFunction = async () => {
  let page = await getMdxPage({
    rootDir: "docs",
    slug: "index.mdx", // no slug because we want the docs/index.mdx file
  });

  if (!page) {
    return json(null, { status: 404 });
  }

  return json(page);
};

export let headers: HeadersFunction = ({ parentHeaders }) => {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control")!,
  };
};

interface Frontmatter {
  title: string;
  description: string;
}

export default function GettingStarted() {
  let { code, frontmatter, sectionsLinks } = useRouteData<
    MdxPage<Frontmatter>
  >();

  let Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="flex">
      <div className="flex-1">
        <header className="text-gray-500 flex-1 pt-8 pb-10 border-b border-gray-200">
          <h1 className="text-gray-900 font-bold text-3xl">
            {frontmatter.title}
          </h1>
          <p className="mt-2 text-lg">{frontmatter.description}</p>
        </header>
        <section className="prose text-gray-500 pt-8">
          <Component />
        </section>

        <hr className="border-gray-200 mt-10 mb-4" />

        <div className="flex font-medium leading-6">
          <a
            href="/docs/01-getting-started/01-overview"
            className="transition-colors text-right text-gray-500 hover:text-gray-900 inline-flex items-start ml-auto"
          >
            Overview
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </a>
        </div>
      </div>

      <DocsPageNavigation links={sectionsLinks} />
    </div>
  );
}
