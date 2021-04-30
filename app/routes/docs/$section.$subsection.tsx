import { json, MetaFunction } from "@remix-run/node";
import { LoaderFunction, useRouteData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { DocsPageNavigation } from "../../components/DocsPageNavigation";
import { CompiledMdx, compileMdx } from "../../utils/mdx.server";

export let meta: MetaFunction = ({ data }) => {
  let { frontmatter } = data as CompiledMdx;
  return {
    title: `${frontmatter.title} - Fungi Docs`,
    description: frontmatter.description,
  };
};

export let loader: LoaderFunction = async ({ params }) => {
  let compiledMdx = await compileMdx(
    `/docs/${params.section}/${params.subsection}`
  );

  return json(compiledMdx);
};

export default function DocsPage() {
  let { code, frontmatter, sectionsLinks } = useRouteData<CompiledMdx>();
  let Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="text-gray-500 flex-1 pt-8 pb-10 border-b border-gray-200">
          <h1 className="text-gray-900 font-bold text-3xl">
            {frontmatter.title}
          </h1>
          <p className="mt-2 text-lg">{frontmatter.description}</p>
        </div>
        <div className="prose text-gray-500 pt-8 pb-12">
          <Component />
        </div>
      </div>

      <DocsPageNavigation links={sectionsLinks} />
    </div>
  );
}
