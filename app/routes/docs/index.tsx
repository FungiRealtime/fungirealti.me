// This is the getting started page

import { json, LoaderFunction } from "@remix-run/node";
import { octokit } from "../../octokit.server";

export let loader: LoaderFunction = async () => {
  //
  // octokit.request()
  return json(null);
};

export default function DocsIndex() {
  return <p>Index</p>;
}
