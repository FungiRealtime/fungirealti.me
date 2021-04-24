export function getDomain() {
  let isProd = process.env.NODE_ENV === "production";
  let domain = isProd ? "https://fungirealti.me" : "http://localhost:3000";
  return domain;
}
