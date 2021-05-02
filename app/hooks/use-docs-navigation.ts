import { useLocation } from "react-router-dom";
import { Section } from "../types";

interface UseDocsNavigation {
  previous: Pick<Section, "title" | "pathname"> | undefined;
  next: Pick<Section, "title" | "pathname"> | undefined;
}

export function useDocsNavigation(docsSections: Section[]): UseDocsNavigation {
  let location = useLocation();

  let subsections = docsSections.find((section) =>
    location.pathname.startsWith(section.pathname)
  )?.subsections;

  if (!subsections) {
    return { previous: undefined, next: undefined };
  }

  let { previous, next } = subsections.reduce(
    (acc, subsection, index, subsections) => {
      if (location.pathname.startsWith(subsections[index + 1]?.pathname)) {
        return {
          ...acc,
          previous: subsection,
        };
      }

      if (location.pathname.startsWith(subsections[index - 1]?.pathname)) {
        return {
          ...acc,
          next: subsection,
        };
      }

      return acc;
    },
    { previous: undefined, next: undefined } as UseDocsNavigation
  );

  return { previous, next };
}
