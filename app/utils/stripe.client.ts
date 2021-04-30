import { loadStripe } from "@stripe/stripe-js";
import { PublicEnv } from "../hooks/usePublicEnv";

declare let window: Window & { ENV: PublicEnv };

let stripePromise = loadStripe(window.ENV.PUBLIC_STRIPE_KEY);

export { stripePromise };
