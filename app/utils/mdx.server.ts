import type { Node } from "unist";
import type { PluggableList } from "unified";
import { bundleMDX } from "mdx-bundler";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutoLinkHeadings from "remark-autolink-headings";
import visit from "unist-util-visit";
import { downloadMdxFileOrDirectory } from "./github.server";
import { GitHubFile, SectionLink, MdxPage } from "../types";

interface HeadingChild {
  type: string;
  value: string;
}

function arrayToObj<ItemType extends Record<string, unknown>>(
  array: Array<ItemType>,
  { keyName, valueName }: { keyName: keyof ItemType; valueName: keyof ItemType }
) {
  let obj: Record<string, ItemType[keyof ItemType]> = {};
  for (let item of array) {
    let key = item[keyName];
    if (typeof key !== "string") {
      throw new Error(`${keyName} of item must be a string`);
    }
    let value = item[valueName];
    obj[key] = value;
  }
  return obj;
}

async function compileMdx<FrontmatterType extends Record<string, any>>(
  slug: string,
  githubFiles: Array<GitHubFile>
): Promise<MdxPage | null> {
  let indexRegex = new RegExp(`${slug}\\/index.mdx?$`);
  let indexFile = githubFiles.find(({ path }) => indexRegex.test(path));
  if (!indexFile) return null;

  let rootDir = indexFile.path.replace(/index.mdx?$/, "");
  let relativeFiles = githubFiles.map(({ path, content }) => ({
    path: path.replace(rootDir, "./"),
    content,
  }));

  let files = arrayToObj(relativeFiles, {
    keyName: "path",
    valueName: "content",
  });

  let sectionsLinks: SectionLink[] = [];
  let remarkPlugins: PluggableList = [
    remarkGfm,
    remarkPrism,
    remarkSlug,
    function getSectionsHeadingsLinks() {
      return function walker(tree: Node) {
        visit(tree, function visitor(node) {
          if (node.type === "heading" && node.children) {
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
              depth: node.depth as number,
            });
          }
        });
      };
    },
    [
      remarkAutoLinkHeadings,
      {
        behavior: "wrap",
        linkProperties: {
          className: "hover:text-gray-700",
          "data-heading": "true",
        },
      },
    ],
  ];

  let { code, frontmatter } = await bundleMDX(indexFile.content, {
    files,
    xdmOptions(_input, options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
      ];
      return options;
    },
  });

  return { code, frontmatter: frontmatter as FrontmatterType, sectionsLinks };
}

export async function getMdxPage({
  rootDir,
  slug,
}: {
  rootDir: string;
  slug: string;
}) {
  let key = `${rootDir}/${slug}`;
  let pageFiles = await downloadMdxFileOrDirectory(key);
  let page = await compileMdx(slug, pageFiles);
  return page;
}
