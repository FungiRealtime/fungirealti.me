import { json, MetaFunction } from "@remix-run/node";
import { LoaderFunction, useRouteData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { DocsPageNavigation } from "../../components/docs-page-navigation";
import { MdxPage, Section } from "../../types";
import { getMdxPage } from "../../utils/mdx.server";
import { MDXAnchor } from "../../components/mdx-anchor";
import { useOutletData } from "../../hooks/use-outlet-data";

export let meta: MetaFunction = ({ data }) => {
  let { frontmatter } = data;
  return {
    title: `${frontmatter.title} - Fungi Docs`,
    description: frontmatter.description,
  };
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

interface OutletData {
  docsSections: Section[];
}

function usePreviousAndNextSections(
  docsSections: Section[]
): [
  Pick<Section, "title" | "pathname"> | undefined,
  Pick<Section, "title" | "pathname"> | undefined
] {
  let [previousSection, nextSection] =
    docsSections
      .find((section) => location.pathname.startsWith(section.pathname))
      ?.subsections.filter(
        (_, index, subsections) =>
          location.pathname.startsWith(subsections[index + 1]?.pathname) ||
          location.pathname.startsWith(subsections[index - 1]?.pathname)
      ) ?? [];

  return [previousSection, nextSection];
}

export default function DocsPage() {
  let { code, frontmatter, sectionsLinks } = useRouteData<MdxPage>();
  let Component = useMemo(() => getMDXComponent(code), [code]);
  let { docsSections } = useOutletData<OutletData>();
  let [previousSection, nextSection] = usePreviousAndNextSections(docsSections);

  console.log({ previousSection, nextSection });

  return (
    <div className="flex">
      <div className="flex-1 min-w-0 pb-24 lg:pb-16">
        <div className="text-gray-500 flex-1 pt-8 pb-10 border-b border-gray-200">
          <h1 className="text-gray-900 font-bold text-3xl">
            {frontmatter.title}
          </h1>
          <p className="mt-2 text-lg">{frontmatter.description}</p>
        </div>
        <div className="prose text-gray-500 pt-8">
          <Component
            components={{
              a: (props) => (
                <MDXAnchor {...props} sectionsLinks={sectionsLinks} />
              ),
            }}
          />
        </div>

        <hr className="border-gray-200 mt-10 mb-4" />

        <div className="flex font-medium leading-6">
          <a
            href="#"
            className="mr-8 transition-colors text-gray-500 hover:text-gray-900 inline-flex items-start"
          >
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            Previous page
          </a>
          <a
            href="#"
            className="transition-colors text-right text-gray-500 hover:text-gray-900 inline-flex items-start ml-auto"
          >
            Next page
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
