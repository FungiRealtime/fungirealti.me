import "dotenv/config";
import { createCookieSessionStorage } from "@remix-run/node";

let { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [process.env.SESSION_SECRET_1!],
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1209600, // 14 days,
  },
});

export { getSession, commitSession, destroySession };
