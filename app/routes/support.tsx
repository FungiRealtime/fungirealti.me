import { Header } from "../components/header";
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "remix";
import { commitSession, getSession } from "../utils/sessions";
import { Form, usePendingFormSubmit, useRouteData } from "remix";
import Mailgun from "mailgun-js";
import { usePublicEnv } from "../hooks/use-public-env";
import { getGithubOauthUrl } from "../utils/get-github-oauth-url";
import { mailgun } from "../utils/mailgun.server";
import { classNames } from "../utils/classNames";
import { Footer } from "../components/footer";

export let meta: MetaFunction = () => {
  return {
    title: "Fungi | Contact support",
    description:
      "Fungi empowers developers to add realtime features to their apps with easy to use and scalable APIs.",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  let url = new URL(request.url);
  let params = new URLSearchParams(url.search);

  let data = {
    isLoggedIn: session.has("user"),
    validationErrors: session.get("validationErrors") ?? [],
    mailError: session.get("mailError"),
    isSuccess: params.has("success"),
  };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export let action: ActionFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  let body = new URLSearchParams(await request.text());
  let email = body.get("email");
  let subject = body.get("subject");
  let message = body.get("message");
  let validationErrors: Record<string, string> = {};

  if (!email) {
    validationErrors["email"] = "Required";
  } else if (email.indexOf("@") === -1) {
    validationErrors["email"] = "Invalid email";
  }

  if (!subject) {
    validationErrors["subject"] = "Required";
  }

  if (!message) {
    validationErrors["message"] = "Required";
  }

  if (Object.keys(validationErrors).length > 0) {
    session.flash("validationErrors", validationErrors);

    return redirect("/support", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  let mailData: Mailgun.messages.SendData = {
    from: email!,
    to: "support@fungirealti.me",
    subject: subject!,
    text: message!,
  };

  try {
    await mailgun.messages().send(mailData);
  } catch (error) {
    session.flash("mailError", error.message);
    return redirect("/support", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return redirect("/support?success=true");
};

interface RouteData {
  isLoggedIn: boolean;
  validationErrors: Record<string, string>;
  mailError?: string;
  isSuccess: boolean;
}

export default function Support() {
  let {
    isLoggedIn,
    validationErrors,
    mailError,
    isSuccess,
  } = useRouteData<RouteData>();
  let { PUBLIC_GITHUB_CLIENT_ID } = usePublicEnv();
  let githubOAuthUrl = getGithubOauthUrl(PUBLIC_GITHUB_CLIENT_ID!);
  let pendingSubmit = usePendingFormSubmit();

  return (
    <>
      <div className="pb-6 bg-gray-900">
        <Header isLoggedIn={isLoggedIn} githubOAuthUrl={githubOAuthUrl} />
      </div>

      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-full transform translate-x-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
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
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <svg
            className="absolute right-full bottom-0 transform -translate-x-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
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
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>

          {isSuccess ? (
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Request submitted
              </h2>

              <div className="mt-8 prose prose-lg text-gray-500">
                <p className="text-lg leading-8 text-gray-500">
                  We have received your support request and will get back to you
                  as soon as possible, meanwhile feel free to check out the
                  following resources to integrate Fungi into your app:
                </p>

                <ul>
                  <li>
                    <a className="text-brand underline" href="/docs">
                      Documentation
                    </a>
                  </li>
                </ul>
              </div>

              <img
                className="mt-12 w-[60%]"
                src="/images/mail_sent.svg"
                alt=""
              />
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Contact support
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                  Submit a request and we'll get back to you as soon as
                  possible.
                </p>
              </div>
              <div className="mt-12">
                <Form
                  action="/support"
                  method="post"
                  className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div className="sm:col-span-2">
                    <div className="flex justify-between items-end">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email *
                      </label>
                      {validationErrors.email && (
                        <strong
                          className="text-sm text-red-500 font-normal"
                          key={validationErrors.email}
                        >
                          {validationErrors.email}
                        </strong>
                      )}
                    </div>
                    <div className="mt-1">
                      <input
                        required
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="email"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-brand focus:border-brand border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex justify-between items-end">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject *
                      </label>
                      {validationErrors.subject && (
                        <strong
                          className="text-sm text-red-500 font-normal"
                          key={validationErrors.subject}
                        >
                          {validationErrors.subject}
                        </strong>
                      )}
                    </div>

                    <div className="mt-1">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-brand focus:border-brand border-gray-300 rounded-md"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        A brief description of your request.
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex justify-between items-end">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        How can we help? *
                      </label>
                      {validationErrors.message && (
                        <strong
                          className="text-sm text-red-500 font-normal"
                          key={validationErrors.message}
                        >
                          {validationErrors.message}
                        </strong>
                      )}
                    </div>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-brand focus:border-brand border-gray-300 rounded-md"
                        defaultValue={""}
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Please enter the details of your request. For technical
                        problems, please include any steps to reproduce the
                        issue.
                      </p>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className={classNames(
                        "w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand",
                        !!pendingSubmit
                          ? "cursor-not-allowed bg-opacity-60 hover:bg-opacity-60"
                          : ""
                      )}
                    >
                      {!!pendingSubmit && (
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
                      Submit
                    </button>
                  </div>
                  {mailError && (
                    <div className="sm:col-span-2">
                      <strong className="text-red-500 font-normal">
                        {mailError}
                      </strong>
                    </div>
                  )}
                </Form>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
