import { LoaderFunction, MetaFunction, useRouteData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { ChatIcon } from "@heroicons/react/outline";
import { BellIcon, ChevronRightIcon, GlobeIcon } from "@heroicons/react/solid";
import { getSession } from "../utils/sessions";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { getGithubOauthUrl } from "../utils/get-github-oauth-url";
import { usePublicEnv } from "../hooks/use-public-env";

export let meta: MetaFunction = () => {
  return {
    title: "Fungi | Powering realtime experiences",
    description:
      "Fungi empowers developers to add realtime features to their apps with easy to use and scalable APIs.",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  let data = {
    isLoggedIn: session.has("user"),
  };

  return json(data);
};

let features = [
  {
    name: "In app chats",
    icon: ChatIcon,
    description: "Bring your users an amazing conversational experience.",
  },
  {
    name: "WebRTC apps",
    icon: GlobeIcon,
    description:
      "Reliable video calls, voice calls and more with WebRTC and Fungi as your signaling service.",
  },
  {
    name: "Notifications",
    icon: BellIcon,
    description:
      "Keep your users in the loop with instant notifications delivered every time.",
  },
];

interface RouteData {
  isLoggedIn: boolean;
}

export default function Index() {
  let { isLoggedIn } = useRouteData<RouteData>();
  let { PUBLIC_GITHUB_CLIENT_ID } = usePublicEnv();
  let githubOAuthUrl = getGithubOauthUrl(PUBLIC_GITHUB_CLIENT_ID);

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <Header githubOAuthUrl={githubOAuthUrl} isLoggedIn={isLoggedIn} />

        <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-20">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    {!isLoggedIn && (
                      <a
                        href="/pricing"
                        className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                      >
                        <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-brand rounded-full">
                          50% OFF!
                        </span>
                        <span className="ml-4 text-sm">
                          Visit our pricing page
                        </span>
                        <ChevronRightIcon
                          className="ml-2 w-5 h-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">A better way to</span>
                      <span className="block text-brand">
                        build realtime apps
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Robust, scalable and easy to use realtime APIs and SDKs.
                      We take care of all the complexity so you can focus on
                      building your app.
                    </p>
                  </div>
                </div>
                <div className="mt-12 -mb-16 lg:mb-0 lg:mt-12 lg:relative flex items-center">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:max-w-none"
                      src="/hero.svg"
                      alt="Collaboration"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Features */}
          <div className="relative bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-brand uppercase">
                Use cases
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                What can you build with Fungi?
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                You can build just about any realtime feature you can think of.
                Here are some common use cases.
              </p>
              <div className="mt-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.name} className="pt-6">
                      <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-brand rounded-md shadow-lg">
                              <feature.icon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                            {feature.name}
                          </h3>
                          <p className="mt-5 text-base text-gray-500">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-red-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                <span className="block">Ready to dive in?</span>
                <span className="block text-brand">Get started today.</span>
              </h2>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href={isLoggedIn ? "/get-started" : githubOAuthUrl}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand hover:bg-red-500"
                  >
                    {isLoggedIn ? "Get started" : "Sign up"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
