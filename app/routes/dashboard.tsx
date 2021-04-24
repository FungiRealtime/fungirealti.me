import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { Fragment } from "react";
import { getSession } from "../sessions";
import { getGithubOauthUrl } from "../utils/getGithubOauthUrl";
import { DashboardHeader, DashboardOutlet } from "../components";

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
