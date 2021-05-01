import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface Href {
  url: string;
  active: boolean;
}

interface ActiveHeadingContextType {
  hrefs: Href[];
  setHrefs: Dispatch<SetStateAction<Href[]>>;
}

export let ActiveHeadingContext = createContext<ActiveHeadingContextType>({
  hrefs: [],
  setHrefs: () => {},
});

interface ActiveHeadingProviderProps {
  children: ReactNode;
}

export function ActiveHeadingProvider({
  children,
}: ActiveHeadingProviderProps) {
  let [hrefs, setHrefs] = useState<Href[]>([]);

  return (
    <ActiveHeadingContext.Provider value={{ hrefs, setHrefs }}>
      {children}
    </ActiveHeadingContext.Provider>
  );
}
