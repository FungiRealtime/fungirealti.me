import { StripeCustomer } from ".prisma/client";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { json, LoaderFunction, MetaFunction, redirect } from "remix";
import { Form, usePendingFormSubmit, useRouteData } from "remix";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { usePublicEnv } from "../hooks/use-public-env";
import { prisma } from "../utils/prisma.server";
import { commitSession, getSession } from "../utils/sessions";
import { stripePromise } from "../utils/stripe.client";
import { SessionUser } from "../types";
import { classNames } from "../utils/classNames";
import { getGithubOauthUrl } from "../utils/get-github-oauth-url";

export let meta: MetaFunction = () => {
  return {
    title: "Fungi | Pricing",
    description: "Simple no-tricks pricing. Pay once, own it forever.",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("user")) {
    return json({ user: null, stripeCustomer: null });
  }

  let user = session.get("user") as SessionUser;

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      stripeCustomer: true,
    },
  });

  if (!dbUser) {
    return redirect("/oauth/sign-out?next=/pricing");
  }

  let data = {
    user: session.get("user"),
    checkoutSessionId: session.get("checkoutSessionId"),
    stripeCustomer: dbUser.stripeCustomer,
  };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

let includedFeatures = ["SDKs", "APIs", "Support", "Community discussions"];

interface RouteData {
  user: SessionUser | null;
  stripeCustomer: StripeCustomer | null;
  checkoutSessionId?: string;
}

export default function Pricing() {
  let { user, stripeCustomer, checkoutSessionId } = useRouteData<RouteData>();
  let { PUBLIC_GITHUB_CLIENT_ID } = usePublicEnv();
  let githubOAuthUrl = getGithubOauthUrl(PUBLIC_GITHUB_CLIENT_ID!, "/pricing");
  let pendingSubmit = usePendingFormSubmit();
  let isCheckingOut = !!pendingSubmit || !!checkoutSessionId;

  let redirectToCheckout = async (sessionId: string) => {
    let stripe = await stripePromise;
    if (!stripe) {
      return;
    }

    let redirectResult = await stripe.redirectToCheckout({
      sessionId,
    });

    if (redirectResult.error) {
      // TODO: Handle error
      console.error(redirectResult.error);
    }
  };

  useEffect(() => {
    if (checkoutSessionId) {
      redirectToCheckout(checkoutSessionId);
    }
  }, [checkoutSessionId]);

  return (
    <>
      <Header isLoggedIn={!!user} githubOAuthUrl={githubOAuthUrl} />

      <div className="bg-gray-900">
        <div className="pt-12 sm:pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Simple no-tricks pricing
              </h2>
              <p className="mt-4 text-xl text-gray-300">
                If you're not satisfied, contact us within the first 14 days and
                we'll send you a full refund.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-900" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                  <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    Lifetime License
                  </h3>
                  <p className="mt-6 text-base text-gray-500">
                    The license grants permission to{" "}
                    <strong>one individual</strong> (the Licensee) to access and
                    use all our products.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-brand">
                        What's included
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200" />
                    </div>
                    <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                      {includedFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start lg:col-span-1"
                        >
                          <div className="flex-shrink-0">
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Pay once, own it forever
                  </p>
                  <div className="flex items-center mt-4 space-x-3">
                    {/* Original price */}
                    <div>
                      <span className="line-through inline text-lg font-medium text-gray-500">
                        $250
                      </span>
                    </div>

                    {/* Current price */}
                    <div className="flex items-center justify-center text-5xl font-extrabold text-gray-900">
                      <span>$125</span>
                      <span className="ml-3 text-xl font-medium text-gray-500">
                        USD
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    <a
                      href="/legal/license"
                      className="font-medium text-gray-500 underline"
                    >
                      Learn more about our license
                    </a>
                  </p>

                  <div className="mt-6">
                    {!!user ? (
                      stripeCustomer ? (
                        <>
                          <p className="flex text-sm font-medium text-gray-900 items-center justify-center space-x-2">
                            Owned since{" "}
                            {format(
                              parseISO(stripeCustomer.createdAt as any),
                              "d'/'M'/'y"
                            )}
                          </p>
                        </>
                      ) : (
                        <Form method="post" action="/buy">
                          <button
                            type="submit"
                            disabled={isCheckingOut}
                            className={classNames(
                              "flex items-center justify-center w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900",
                              isCheckingOut
                                ? "cursor-not-allowed bg-opacity-50 hover:bg-opacity-50"
                                : ""
                            )}
                          >
                            {isCheckingOut && (
                              <svg
                                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            )}
                            Get access
                          </button>
                        </Form>
                      )
                    ) : (
                      <div>
                        <a
                          href={githubOAuthUrl}
                          className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                        >
                          Log in
                        </a>

                        <p className="mt-2 text-gray-600 text-sm">
                          Don't have an account?{" "}
                          <a href={githubOAuthUrl} className="text-brand">
                            Sign up
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
