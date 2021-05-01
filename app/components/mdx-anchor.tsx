import { HTMLProps, ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useActiveHeading } from "../hooks/use-active-heading";
import { SectionLink } from "../types";

interface AnchorProps extends HTMLProps<HTMLAnchorElement> {
  children?: ReactNode;
  sectionsLinks: SectionLink[];
}

function HeadingAnchor({ children, sectionsLinks, ...props }: AnchorProps) {
  let { setHrefs } = useActiveHeading();
  let { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setHrefs((currentHrefs) =>
        sectionsLinks.map((link) => {
          let isCurrent = link.href === props.href;

          if (isCurrent) {
            return {
              active: true,
              url: link.href,
            };
          }

          let existing = currentHrefs.find((href) => href.url === link.href);
          if (existing) {
            return {
              active: existing.active,
              url: link.href,
            };
          }

          return {
            active: false,
            url: link.href,
          };
        })
      );
    } else {
      setHrefs((currentHrefs) =>
        sectionsLinks.map((link) => {
          let isCurrent = link.href === props.href;

          if (isCurrent) {
            return {
              active: false,
              url: link.href,
            };
          }

          let existing = currentHrefs.find((href) => href.url === link.href);
          if (existing) {
            return {
              active: existing.active,
              url: link.href,
            };
          }

          return {
            active: false,
            url: link.href,
          };
        })
      );
    }
  }, [inView, setHrefs, props.href]);

  return (
    <a ref={ref} {...props}>
      {children}
    </a>
  );
}

export function MDXAnchor({ children, ...props }: AnchorProps) {
  let isHeading = props.href?.charAt(0) === "#";

  if (isHeading) {
    return <HeadingAnchor {...props}>{children}</HeadingAnchor>;
  }

  return <a {...props}>{children}</a>;
}
