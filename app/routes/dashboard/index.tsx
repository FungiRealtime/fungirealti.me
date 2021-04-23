import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useRouteData } from "@remix-run/react";
import { getSession } from "../../sessions";
import { DataWithUser } from "../../types";
import { getGithubOauthUrl } from "../../utils/getGithubOauthUrl";

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("user")) {
    return redirect(getGithubOauthUrl(process.env.PUBLIC_GITHUB_CLIENT_ID!));
  }

  return json({ user: session.get("user") });
};

export default function Dashboard() {
  let { user } = useRouteData<DataWithUser>();

  return <p>Hi {user.name}!</p>;
}
