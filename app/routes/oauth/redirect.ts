import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useRouteData } from "@remix-run/react";
import { prisma } from "../../prisma.server";
import { commitSession, getSession } from "../../sessions";

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  // If the user is already logged in, redirect to dashboard.
  if (session.has("user")) {
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  let url = new URL(request.url);
  let params = new URLSearchParams(url.search);

  let code = params.get("code");
  let clientId = process.env.PUBLIC_GITHUB_CLIENT_ID;
  let clientSecret = process.env.GITHUB_CLIENT_SECRET;
  let accessTokenUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

  let accessTokenResponse = await fetch(accessTokenUrl, {
    method: "POST",
    headers: { accept: "application/json" },
  });

  if (!accessTokenResponse.ok) {
    return json(
      { error: "Oops! Something went wrong authorizing you with Github." },
      { status: accessTokenResponse.status }
    );
  }

  let accessTokenJSON = await accessTokenResponse.json();
  let { error, error_description } = accessTokenJSON;

  if (error) {
    return json(
      { error: `Got error ${error}. ${error_description}` },
      { status: 500 }
    );
  }

  let { access_token } = accessTokenJSON;
  let userResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `token ${access_token}` },
  });

  if (!userResponse.ok) {
    return json(
      { error: "Oops! Something went wrong requesting your user info." },
      { status: userResponse.status }
    );
  }

  let githubUser = await userResponse.json();

  let payload = {
    githubUserId: githubUser.id,
    username: githubUser.login,
    name: githubUser.name,
    email: githubUser.email,
    avatarURL: githubUser.avatar_url,
  };

  try {
    let { id, name, email, avatarURL, username } = await prisma.user.upsert({
      where: { username: githubUser.login },
      create: payload,
      update: payload,
    });

    session.set("user", {
      id,
      name,
      email,
      avatarURL,
      username,
    });

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
};

export default function OAuthRedirect() {
  let { error } = useRouteData();

  // TODO: Handle error
  console.log(error);

  return null;
}
