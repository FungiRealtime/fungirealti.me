import { useContext } from "react";
import { ActiveHeadingContext } from "../active-heading-provider";

export function useActiveHeading() {
  let context = useContext(ActiveHeadingContext);

  if (!context) {
    throw new Error(
      `Can't use hook useActiveHeading outside of an ActiveHeadingProvider`
    );
  }

  return context;
}
