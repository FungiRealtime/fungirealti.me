import { loadStripe } from "@stripe/stripe-js";
import { PublicEnv } from "../hooks/use-public-env";

declare let window: Window & { ENV: PublicEnv };

let stripePromise = loadStripe(window.ENV.PUBLIC_STRIPE_KEY!);

export { stripePromise };
