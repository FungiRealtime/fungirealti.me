import { Request, Response } from "express";
import { octokit } from "../app/octokit.server";
import { prisma } from "../app/prisma.server";
import { stripe } from "../app/stripe.server";

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

      await prisma.stripeCustomer.create({
        data: {
          id: session.customer,
          paymentIntentId: session.payment_intent,
          user: {
            connect: {
              id: user.id,
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
