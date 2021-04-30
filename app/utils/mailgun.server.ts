import createMailgun from "mailgun-js";

const mailgun = createMailgun({
  apiKey: process.env.MAILGUN_API_KEY!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export { mailgun };
