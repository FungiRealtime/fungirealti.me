export interface GitHubFile {
  path: string;
  content: string;
}

export interface MdxPage<
  FrontmatterType extends Record<string, any> = Record<string, any>
> {
  code: string;
  frontmatter: FrontmatterType;
  sectionsLinks: SectionLink[];
}

export interface SectionLink {
  text: string;
  href: string;
  depth: number;
}

export interface GithubFileOrDir {
  name: string;
  sha: string;
}

export interface Tree {
  path: string;
  type: string;
}

export interface Section {
  title: string;
  pathname: string;
  subsections: Pick<Section, "title" | "pathname">[];
}

interface HighlightResult {
  fullyHighlighted: boolean;
  matchLevel: string;
  matchedWords: string[];
  value: string;
}

export interface DocsSearchResult {
  nbHits: number;
  query: string;
  hits: {
    url: string;
    type: string;
    hierarchy: {
      lvl0: string;
      lvl1: string | null;
    };
    _highlightResult: {
      hierarchy: {
        lvl0: HighlightResult;
        lvl1?: HighlightResult;
      };
    };
  }[];
}
