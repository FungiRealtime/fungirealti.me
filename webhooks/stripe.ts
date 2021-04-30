import { Request, Response } from "express";
import { octokit } from "../app/utils/octokit.server";
import { prisma } from "../app/utils/prisma.server";
import { stripe } from "../app/utils/stripe.server";

let stripeWebhook = async (request: Request, response: Response) => {
  let secret = process.env.STRIPE_WEBHOOK_SECRET!;
  let sig = request.headers["stripe-signature"]!;
  let event;
  let payload = request.body;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    console.error(err);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    let session = event.data.object as Record<string, any>;
    let userId = session.metadata.userId;

    try {
      let user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
          stripeCustomer: true,
        },
      });

      if (!user) {
        return response.status(400).send(`Webhook Error: user not found.`);
      }

      if (user.stripeCustomer) {
        return response
          .status(400)
          .send(`Webhook Error: this user already owns a license.`);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeCustomer: {
            create: {
              id: session.customer,
              paymentIntentId: session.payment_intent,
            },
          },
        },
      });

      await octokit.request(
        "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}",
        {
          org: "FungiRealtime",
          team_slug: "customers",
          username: user.username,
          role: "member",
        }
      );
    } catch (err) {
      console.error(err);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  return response.status(200).send("Webhook Success");
};

export { stripeWebhook };
