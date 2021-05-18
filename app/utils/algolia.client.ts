import algoliasearch from "algoliasearch/lite";
import { PublicEnv } from "../hooks/use-public-env";

declare let window: Window & { ENV: PublicEnv };

let searchClient = algoliasearch(
  window.ENV.PUBLIC_ALGOLIA_APP_ID!,
  window.ENV.PUBLIC_ALGOLIA_API_KEY!
);

let docsSearchParams = {
  attributesToRetrieve: ["hierarchy.lvl0", "hierarchy.lvl1", "url"],
};

export { searchClient, docsSearchParams };
