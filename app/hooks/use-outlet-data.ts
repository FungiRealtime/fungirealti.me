import { useContext } from "react";
import { OutletDataContext } from "../outlet-data-provider";

export function useOutletData<TData = any>() {
  let context = useContext<{ data: TData }>(OutletDataContext);

  if (!context) {
    throw new Error(
      `Can't use hook useOutletData outside of an OutletDataProvider`
    );
  }

  return context.data;
}
