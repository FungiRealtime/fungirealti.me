import "dotenv/config";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler } from "@remix-run/express";
import { stripeWebhook } from "./webhooks/stripe";

let app = express();

// Responses should be served with compression to minimize total network bytes.
// However, where this compression happens can vary wildly depending on your stack
// and infrastructure. Here we are compressing all our Express responses for the
// purpose of this starter repository, but feel free to (re)move it or change it.
app.use(compression());

app.use(
  express.static("public", {
    immutable: true,
    maxAge: "1y",
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("tiny"));
} else {
  app.use(morgan("dev"));
}

app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
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
