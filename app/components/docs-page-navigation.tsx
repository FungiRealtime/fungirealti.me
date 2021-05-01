import { useActiveHeading } from "../hooks/use-active-heading";
import { SectionLink } from "../types";
import { classNames } from "../utils/classNames";

interface DocsPageNavigationProps {
  links: SectionLink[];
}

export function DocsPageNavigation({ links }: DocsPageNavigationProps) {
  let { hrefs } = useActiveHeading();
  let activeHref = hrefs.find((href) => href.active)?.url;

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
              className={classNames(
                "block transform transition-all duration-200 py-2 hover:text-gray-900",

                link.depth === 3
                  ? "ml-4"
                  : link.depth === 4
                  ? "ml-6"
                  : link.depth === 5
                  ? "ml-8"
                  : link.depth === 6
                  ? "ml-10"
                  : "",

                link.href === activeHref ? "text-gray-900 font-semibold" : ""
              )}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
