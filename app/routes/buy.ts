import { ActionFunction, redirect } from "@remix-run/node";
import { commitSession, getSession } from "../utils/sessions";
import { stripe } from "../utils/stripe.server";
import { getDomain } from "../utils/domain";
import { getGithubOauthUrl } from "../utils/get-github-oauth-url";

export let action: ActionFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("user")) {
    return redirect(
      getGithubOauthUrl(process.env.PUBLIC_GITHUB_CLIENT_ID!, "/pricing")
    );
  }

  let domain = getDomain();

  let checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Fungi License",
          },
          unit_amount: 125_00, // 250_00 in a couple months
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${domain}/get-started`,
    cancel_url: `${domain}/pricing`,
    metadata: {
      userId: session.get("user").id,
    },
  });

  session.flash("checkoutSessionId", checkoutSession.id);

  return redirect("/pricing", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Buy() {
  return null;
}
