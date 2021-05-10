import {
  Meta,
  Links,
  Scripts,
  LinksFunction,
  LoaderFunction,
  useRouteData,
  LiveReload,
} from "remix";
import { Outlet } from "react-router-dom";
import styles from "./styles/app.css";
import { createElement, ReactNode } from "react";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export let loader: LoaderFunction = () => {
  return {
    ENV: {
      PUBLIC_ALGOLIA_APP_ID: process.env.PUBLIC_ALGOLIA_APP_ID,
      PUBLIC_ALGOLIA_API_KEY: process.env.PUBLIC_ALGOLIA_API_KEY,
      PUBLIC_ALGOLIA_INDEX: process.env.PUBLIC_ALGOLIA_INDEX,
    },
  };
};

interface RouteData {
  ENV: Record<string, string>;
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({ children }: { children: ReactNode }) {
  let data = useRouteData<RouteData>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />

        <link rel="stylesheet" href={styles} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Links />
      </head>
      <body>
        {children}
        <LiveReload />
        <EnvironmentVariables env={data.ENV} />
        <Scripts />
      </body>
    </html>
  );
}

function EnvironmentVariables({ env }: { env: RouteData["ENV"] }) {
  return createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `window.ENV = ${JSON.stringify(env)}`,
    },
  });
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href={styles} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Oops!</title>
      </head>
      <body>
        <div>
          <h1>Error</h1>
          <pre>{error.message}</pre>
        </div>

        <Scripts />
      </body>
    </html>
  );
}
