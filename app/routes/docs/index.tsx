import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { useRouteData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { DocsPageNavigation } from "../../components/docs-page-navigation";
import { MdxPage } from "../../types";
import { getMdxPage } from "../../utils/mdx.server";

export let meta: MetaFunction = ({ data }) => {
  let { frontmatter } = data;
  return {
    title: `${frontmatter.title} - Fungi Docs`,
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
      <div id="content" className="flex-1">
        <header className="text-gray-500 flex-1 pt-8 pb-10 border-b border-gray-200">
          <h1 className="text-gray-900 font-bold text-3xl">
            {frontmatter.title}
          </h1>
          <p className="mt-2 text-lg">{frontmatter.description}</p>
        </header>
        <section className="prose text-gray-500 pt-8 pb-12">
          <Component />
        </section>
      </div>

      <DocsPageNavigation links={sectionsLinks} />
    </div>
  );
}
