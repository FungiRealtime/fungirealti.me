import { LoaderFunction, redirect } from "remix";

export let loader: LoaderFunction = () => {
  return redirect("/docs/01-getting-started/01-overview", {
    status: 303,
  });
};

export default function GettingStarted() {
  return null;
}
