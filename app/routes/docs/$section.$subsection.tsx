import { HeadersFunction, json, MetaFunction } from "remix";
import { LoaderFunction, useRouteData } from "remix";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { DocsPageNavigation } from "../../components/docs-page-navigation";
import { MdxPage, Section } from "../../types";
import { getMdxPage } from "../../utils/mdx.server";
import { MDXAnchor } from "../../components/mdx-anchor";
import { useOutletData } from "../../hooks/use-outlet-data";
import { useDocsNavigation } from "../../hooks/use-docs-navigation";
import { generateMeta } from "../../utils/seo";

export let meta: MetaFunction = ({ data, location }) => {
  if (!data) {
    return generateMeta({
      pathname: location.pathname,
      title: `Page not found - Fungi Docs`,
      description: "The page you're trying to visit doesn't exist in the docs.",
    });
  }

  let { frontmatter } = data;

  return generateMeta({
    pathname: location.pathname,
    title: `${frontmatter.title} - Fungi Docs`,
    description: frontmatter.description,
  });
};

export let loader: LoaderFunction = async ({ params }) => {
  let page = await getMdxPage({
    rootDir: "docs",
    slug: `${params.section}/${params.subsection}`,
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

interface OutletData {
  docsSections: Section[];
}

interface ContentProps {
  data: MdxPage;
}

function Content({ data }: ContentProps) {
  let { code, frontmatter, sectionsLinks } = data;
  let Component = useMemo(() => getMDXComponent(code), [code]);
  let { docsSections } = useOutletData<OutletData>();
  let { previous, next } = useDocsNavigation(docsSections);

  return (
    <div className="flex">
      <div className="flex-1 min-w-0 pb-24 lg:pb-16">
        <header className="text-gray-500 flex-1 pt-8 pb-10 border-b border-gray-200">
          <h1 className="text-gray-900 font-bold text-3xl">
            {frontmatter.title}
          </h1>
          <p className="mt-2 text-lg">{frontmatter.description}</p>
        </header>
        <section className="prose text-gray-500 pt-8">
          <Component
            components={{
              a: (props) => (
                <MDXAnchor {...props} sectionsLinks={sectionsLinks} />
              ),
            }}
          />
        </section>

        {(previous || next) && (
          <>
            <hr className="border-gray-200 mt-10 mb-4" />

            <div className="flex font-medium leading-6">
              {previous && (
                <a
                  href={previous.pathname}
                  className="mr-8 transition-colors text-gray-500 hover:text-gray-900 inline-flex items-start"
                >
                  <span aria-hidden="true" className="mr-2">
                    ←
                  </span>
                  {previous.title}
                </a>
              )}

              {next && (
                <a
                  href={next.pathname}
                  className="transition-colors text-right text-gray-500 hover:text-gray-900 inline-flex items-start ml-auto"
                >
                  {next.title}
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </a>
              )}
            </div>
          </>
        )}
      </div>

      <DocsPageNavigation links={sectionsLinks} />
    </div>
  );
}

export default function DocsPage() {
  let data = useRouteData<MdxPage | null>();

  if (!data) {
    return (
      <div className="flex">
        <div className="flex-1 min-w-0 pb-24 lg:pb-16">
          <header className="text-gray-500 flex-1 pt-8 pb-10">
            <h1 className="text-gray-900 font-bold text-3xl">Page not found</h1>
            <p className="mt-2 text-lg">
              The page you're trying to visit doesn't exist in the docs.
            </p>
          </header>
        </div>
      </div>
    );
  }

  return <Content data={data} />;
}
