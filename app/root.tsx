import {
  Meta,
  Links,
  Scripts,
  useLiveReload,
  LinksFunction,
  LoaderFunction,
  useRouteData,
} from "@remix-run/react";
import { Outlet } from "react-router-dom";
import styles from "./styles/app.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export let loader: LoaderFunction = () => {
  return {
    ENV: {
      PUBLIC_GITHUB_CLIENT_ID: process.env.PUBLIC_GITHUB_CLIENT_ID,
      PUBLIC_STRIPE_KEY: process.env.PUBLIC_STRIPE_KEY,
      PUBLIC_ALGOLIA_APP_ID: process.env.PUBLIC_ALGOLIA_APP_ID,
      PUBLIC_ALGOLIA_API_KEY: process.env.PUBLIC_ALGOLIA_API_KEY,
      PUBLIC_ALGOLIA_INDEX: process.env.PUBLIC_ALGOLIA_INDEX,
    },
  };
};

export default function App() {
  let data = useRouteData();
  useLiveReload();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Oops!</title>
      </head>
      <body>
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
        </div>

        <Scripts />
      </body>
    </html>
  );
}
