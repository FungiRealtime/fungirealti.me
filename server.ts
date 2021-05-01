import "dotenv/config";
import path from "path";
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

let isProd = process.env.NODE_ENV === "production";

if (isProd) {
  app.use(morgan("tiny"));
  app.use((req, res, next) => {
    if (req.get("X-Forwarded-Proto") == "http") {
      // request was via http, so redirect to https
      res.redirect("https://" + req.headers.host + req.url);
    } else {
      next();
    }
  });
} else {
  app.use(morgan("dev"));
}

app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

if (isProd) {
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
} else {
  let cwd = process.cwd();
  app.all("*", (req, res, next) => {
    for (let key in require.cache) {
      if (key.startsWith(path.join(cwd, "build"))) {
        delete require.cache[key];
        if (process.env.DEBUG) console.warn("deleted", key);
      }
    }

    return createRequestHandler({
      build: require("./build"),
      getLoadContext() {
        // Whatever you return here will be passed as `context` to your loaders
        // and actions.
      },
    })(req, res, next);
  });
}

let port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Express server started on http://localhost:${port}`);
});
