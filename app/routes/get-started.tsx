import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useRouteData } from "@remix-run/react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { usePublicEnv } from "../hooks/use-public-env";
import { getSession } from "../utils/sessions";
import { DataWithUser } from "../types";
import { getGithubOauthUrl } from "../utils/get-github-oauth-url";

export let meta: MetaFunction = () => {
  return {
    title: `Fungi | Getting started`,
    description:
      "Fungi empowers developers to add realtime features to their apps with easy to use and scalable APIs.",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("user")) {
    return redirect(
      getGithubOauthUrl(process.env.PUBLIC_GITHUB_CLIENT_ID!, "/get-started")
    );
  }

  return json({ user: session.get("user") });
};

export default function GetStarted() {
  let { user } = useRouteData<DataWithUser>();
  let { PUBLIC_GITHUB_CLIENT_ID } = usePublicEnv();
  let githubOAuthUrl = getGithubOauthUrl(
    PUBLIC_GITHUB_CLIENT_ID,
    "/get-started"
  );

  return (
    <>
      <div className="pb-6 bg-gray-900">
        <Header isLoggedIn={!!user} githubOAuthUrl={githubOAuthUrl} />
      </div>

      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div
            className="relative h-full text-lg max-w-prose mx-auto"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-brand font-semibold tracking-wide uppercase">
                Thank you for choosing us {user.name ?? user.username}!
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Getting started
              </span>
            </h1>
            <p className="mt-8 text-lg text-gray-500 leading-8">
              If you haven't already, <strong>check your email</strong>, there
              should be an email from GitHub with an invitation to our
              organization. Go ahead and accept the invitation, this will allow
              you to use our products and get support from the community. If you
              haven't received the invitation, go ahead and{" "}
              <a
                className="text-brand underline"
                href={`mailto:support@fungirealti.me?subject=Missing GitHub invitation: @${user.username}`}
              >
                shoot us an email
              </a>
              .
            </p>
          </div>
          <div className="mt-6 prose prose-lg text-gray-500 mx-auto">
            <p>
              Once you've joined the GitHub organization, you can check out the
              following resources to integrate Fungi into your app:
            </p>
            <ul>
              <li>
                <a className="text-brand underline" href="/docs">
                  Documentation
                </a>
              </li>
              <li>
                <a className="text-brand underline" href="/tutorials">
                  Tutorials
                </a>
              </li>
            </ul>
            <img
              className="w-full rounded-lg"
              src="/buy_hero.svg"
              alt=""
              width={1310}
              height={873}
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
}
