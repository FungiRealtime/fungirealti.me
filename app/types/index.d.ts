export interface SessionUser {
  id: string;
  name: string | null;
  email: string | null;
  avatarURL: string;
  username: string;
}

export type DataWithUser<TData = Record<string, never>> = TData & {
  user: SessionUser;
};

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

export interface Subsection {
  title: string;
  pathname: string;
}

export interface Section {
  title: string;
  subsections: Subsection[];
}
