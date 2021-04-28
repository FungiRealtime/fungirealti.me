import { json, MetaFunction } from "@remix-run/node";
import { LoaderFunction, useRouteData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { BundledMdx, getBundledMdx } from "../../github.server";

export let meta: MetaFunction = ({ data }) => {
  let { frontmatter } = data as BundledMdx;
  return {
    title: `${frontmatter.title} - Fungi Docs`,
    description: frontmatter.description,
  };
};

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

      <nav className="hidden xl:block pl-12 w-64 pt-10 overflow-y-auto max-h-[84vh] sticky top-16">
        {/* <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">
          On this page
        </h5> */}
        {/* TODO: Get the sections headers and links */}
      </nav>
    </div>
  );
}
