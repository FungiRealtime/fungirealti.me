import { User } from ".prisma/client";
import { CashIcon } from "@heroicons/react/outline";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  LoaderFunction,
  usePendingFormSubmit,
  useRouteData,
} from "@remix-run/react";
import { useEffect } from "react";
import { prisma } from "../../prisma.server";
import { commitSession, getSession } from "../../sessions";
import { stripePromise } from "../../stripe.client";
import { DataWithUser } from "../../types";
import { classNames } from "../../utils/classNames";
import { getGithubOauthUrl } from "../../utils/getGithubOauthUrl";

export let handle = {
  label: "Account",
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("user")) {
    return redirect(getGithubOauthUrl(process.env.PUBLIC_GITHUB_CLIENT_ID!));
  }

  let user = session.get("user") as User;
  let license = await prisma.license.findFirst({
    where: {
      userId: {
        equals: user.id,
      },
    },
    select: {
      id: true,
      boughtAt: true,
    },
  });

  let data = {
    user: session.get("user"),
    license,
    checkoutSession: session.get("checkoutSession"),
  };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

type RouteData = DataWithUser<{
  license: { id: string; boughtAt: Date } | null;
  checkoutSession: { id: string; paymentIntentId: string };
}>;

export default function Account() {
  let { user, license, checkoutSession } = useRouteData<RouteData>();
  let pendingSubmit = usePendingFormSubmit();
  let isCheckingOut = !!pendingSubmit || !!checkoutSession;

  let redirectToCheckout = async () => {
    let stripe = await stripePromise;
    if (!stripe) {
      return;
    }

    console.log("in here");

    let redirectResult = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (redirectResult.error) {
      // TODO: Handle error
      console.error(redirectResult.error);
    }
  };

  useEffect(() => {
    if (checkoutSession) {
      redirectToCheckout();
    }
  }, [checkoutSession]);

  return (
    <>
      {/* Information */}
      <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            If you wish to update this information, do so at GitHub and next
            time you log in the changes will be reflected here.
          </p>
        </div>
        <div className="mt-5 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user.name}</span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user.email}</span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                GitHub username
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user.username}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* License */}
      <div className="mt-12 bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            License
          </h3>

          {license ? (
            <>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details about your license.
              </p>
            </>
          ) : (
            <>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                You don't own a license, you need one to use Fungi.
              </p>
              <Form method="post" action="/buy">
                <button
                  type="submit"
                  disabled={isCheckingOut}
                  className={classNames(
                    "mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand",
                    isCheckingOut &&
                      "cursor-not-allowed bg-opacity-50 hover:bg-opacity-50"
                  )}
                >
                  {isCheckingOut ? (
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
                  ) : (
                    <CashIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Buy license
                </button>
              </Form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
