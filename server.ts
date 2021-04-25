import "dotenv/config";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler } from "@remix-run/express";
import { stripe } from "./app/stripe.server";
import { prisma } from "./app/prisma.server";
import { octokit } from "./app/octokit.server";

let app = express();

// Responses should be served with compression to minimize total network bytes.
// However, where this compression happens can vary wildly depending on your stack
// and infrastructure. Here we are compressing all our Express responses for the
// purpose of this starter repository, but feel free to (re)move it or change it.
app.use(compression());

app.use(express.static("public"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (request, response) => {
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

        let updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCustomer: {
              create: {
                id: session.customer,
                amount: session.amount_total,
                paymentIntentId: session.payment_intent,
              },
            },
          },
          select: {
            username: true,
          },
        });

        await octokit.request(
          "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}",
          {
            org: "FungiRealtime",
            team_slug: "customers",
            username: updatedUser.username,
            role: "member",
          }
        );
      } catch (err) {
        console.error(err);
        return response.status(400).send(`Webhook Error: ${err.message}`);
      }
    }

    return response.status(200).send("Webhook Success");
  }
);

app.all(
  "*",
  createRequestHandler({
    build: require("./build"),
    getLoadContext() {
      // Whatever you return here will be passed as `context` to your loaders
      // and actions.
    },
  })
);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server started on http://localhost:${port}`);
});
