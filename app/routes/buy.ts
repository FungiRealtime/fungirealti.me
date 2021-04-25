import { ActionFunction, redirect } from "@remix-run/node";
import { commitSession, getSession } from "../sessions";
import { stripe } from "../stripe.server";
import { getDomain } from "../utils/domain";
import { getGithubOauthUrl } from "../utils/getGithubOauthUrl";

export let action: ActionFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("user")) {
    return redirect(getGithubOauthUrl(process.env.PUBLIC_GITHUB_CLIENT_ID!));
  }

  let isProd = process.env.NODE_ENV === "production";

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
          unit_amount: 269_00,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    discounts: isProd ? [{ coupon: "zELeQg7K" }] : undefined,
    success_url: `${domain}/buy?success=true`,
    cancel_url: `${domain}/dashboard`,
    metadata: {
      userId: session.get("user").id,
    },
  });

  session.flash("checkoutSessionId", checkoutSession.id);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Buy() {
  return null;
}
