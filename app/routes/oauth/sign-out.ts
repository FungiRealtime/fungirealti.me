import { redirect } from "@remix-run/node";
import { ActionFunction } from "@remix-run/react";
import { destroySession, getSession } from "../../sessions";

export let action: ActionFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function OAuthRedirect() {
  return null;
}
