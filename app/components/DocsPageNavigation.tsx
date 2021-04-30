import { SectionLink } from "../github.server";

interface DocsPageNavigationProps {
  links: SectionLink[];
}

export function DocsPageNavigation({ links }: DocsPageNavigationProps) {
  return (
    <nav className="hidden xl:block pl-12 w-64 pt-10 overflow-y-auto max-h-[84vh] sticky top-16">
      <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">
        On this page
      </h5>
      <ul className="overflow-x-hidden text-gray-500 font-medium text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
