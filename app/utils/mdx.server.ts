import type { Node } from "unist";
import type { PluggableList } from "unified";
import { bundleMDX } from "mdx-bundler";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutoLinkHeadings from "remark-autolink-headings";
import visit from "unist-util-visit";
import { getFirstMdxFileContent } from "./github.server";
import { octokit } from "./octokit.server";

export interface CompiledMdx {
  code: string;
  frontmatter: Record<string, any>;
  sectionsLinks: SectionLink[];
}

export interface SectionLink {
  text: string;
  href: string;
}

interface HeadingChild {
  type: string;
  value: string;
}

/**
 *
 * @param path The path within the repository's content dir where the mdx resides, for example:
 * `/docs/getting-started`
 */
export async function compileMdx(mdxPath: string): Promise<CompiledMdx> {
  let { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "FungiRealtime",
      repo: "fungirealti.me",
      path: `content${mdxPath}`,
    }
  );

  if (!Array.isArray(data)) {
    throw new Error(`Invalid path ${mdxPath}, no content was found.`);
  }

  let files = data.filter(({ type }) => type === "file");
  let content = await getFirstMdxFileContent(files);

  if (!content) {
    throw new Error(
      `Invalid path ${mdxPath}, no files with the extension .mdx or .md were found.`
    );
  }

  let sectionsLinks: SectionLink[] = [];

  let remarkPlugins: PluggableList = [
    remarkGfm,
    remarkPrism,
    remarkSlug,
    function getSectionsHeadingsLinks() {
      return function walker(tree: Node) {
        visit(tree, function visitor(node) {
          if (node.type === "heading" && node.depth === 2 && node.children) {
            let linkHref = `#${node.data?.id}`;
            let linkText = (node.children as HeadingChild[]).find(
              (child) => child.type === "text" && child.value
            )?.value;

            if (!linkText) {
              throw new Error("Found heading without text.");
            }

            sectionsLinks.push({
              href: linkHref,
              text: linkText,
            });
          }
        });
      };
    },
    [
      remarkAutoLinkHeadings,
      {
        behavior: "wrap",
        linkProperties: { className: "hover:text-gray-700 block" },
      },
    ],
  ];

  let { code, frontmatter } = await bundleMDX(content, {
    xdmOptions(_input, options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
      ];
      return options;
    },
  });

  return { code, frontmatter, sectionsLinks };
}
