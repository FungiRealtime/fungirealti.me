import "dotenv/config";
import { stripe } from "../stripe.server";

export async function handleStripeWebhook(request: Request) {
  let payload;

  try {
    payload = await request.json();
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  let secret = process.env.STRIPE_WEBHOOK_SECRET!;
  let sig = request.headers.get("stripe-signature")!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    let session = event.data.object;
    console.log({ session });
  }

  return new Response();
}
