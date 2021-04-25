import { StripeCustomer } from ".prisma/client";
import { json, redirect } from "@remix-run/node";
import { LoaderFunction, useRouteData } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { prisma } from "../../prisma.server";
import { commitSession, getSession } from "../../sessions";
import { DataWithUser, SessionUser } from "../../types";
import { getGithubOauthUrl } from "../../utils/getGithubOauthUrl";

export let handle = {
  label: "Account",
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("user")) {
    return redirect(getGithubOauthUrl(process.env.PUBLIC_GITHUB_CLIENT_ID!));
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
    return redirect("/oauth/sign-out");
  }

  let data = {
    user: session.get("user"),
    stripeCustomer: dbUser.stripeCustomer,
  };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Account() {
  let { user, stripeCustomer } = useRouteData<
    DataWithUser<{ stripeCustomer: StripeCustomer | null }>
  >();

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
            time you log in, the changes will be reflected here.
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
              <dt className="text-sm font-medium text-gray-500">Username</dt>
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

          {stripeCustomer ? (
            <>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details about your license.
              </p>
              <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Owner</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">{user.username}</span>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Issued
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">
                        {format(
                          parseISO(stripeCustomer.createdAt as any),
                          "d'/'M'/'y"
                        )}
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Duration
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">Lifetime</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          ) : (
            <>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  You don't own a license, you need one to use our products.
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                  Go to pricing
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
