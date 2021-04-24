import type { EntryContext } from "@remix-run/node";
import ReactDOMServer from "react-dom/server";
import { RemixServer as Remix } from "@remix-run/react";
import { handleStripeWebhook } from "./utils/handleStripeWebhook";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let { pathname } = new URL(request.url);
  if (pathname === "/stripe/webhook") {
    return handleStripeWebhook(request);
  }

  let markup = ReactDOMServer.renderToString(
    <Remix context={remixContext} url={request.url} />
  );

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      "Content-Type": "text/html",
    },
  });
}
