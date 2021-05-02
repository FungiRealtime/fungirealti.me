import { createContext, ReactNode } from "react";

export let OutletDataContext = createContext<{ data: any }>({
  data: null,
});

interface OutletDataProviderProps {
  children: ReactNode;
  data: any;
}

export function OutletDataProvider({
  children,
  data,
}: OutletDataProviderProps) {
  return (
    <OutletDataContext.Provider value={{ data }}>
      {children}
    </OutletDataContext.Provider>
  );
}
