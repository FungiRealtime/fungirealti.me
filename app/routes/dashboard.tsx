import { json, LoaderFunction, MetaFunction, redirect } from "remix";
import { Fragment } from "react";
import { getSession } from "../utils/sessions";
import { getGithubOauthUrl } from "../utils/get-github-oauth-url";
import { DashboardHeader } from "../components/dashboard-header";
import { DashboardOutlet } from "../components/dashboard-outlet";

export let meta: MetaFunction = () => {
  return {
    title: "Fungi | Dashboard",
    description:
      "Fungi empowers developers to add realtime features to their apps with easy to use and scalable APIs.",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("user")) {
    return redirect(getGithubOauthUrl(process.env.PUBLIC_GITHUB_CLIENT_ID!));
  }

  return json({ user: session.get("user") });
};

export default function Dashboard() {
  return (
    <Fragment>
      <DashboardHeader />
      <DashboardOutlet />
    </Fragment>
  );
}
