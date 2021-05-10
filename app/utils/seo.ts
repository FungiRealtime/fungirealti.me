interface Meta {
  title: string;
  description: string;
  pathname: string;
}

let siteUrl = "https://fungirealti.me";

export function generateMeta(meta: Meta) {
  return {
    title: meta.title,
    description: meta.description,

    "og:image": siteUrl + "/logo_transparent.png",
    "og:image:alt": meta.description,
    "og:site_name": "Fungi",
    "og:type": "website",
    "og:title": meta.title,
    "og:url": siteUrl + meta.pathname,
    "og:description": meta.description,

    "twitter:image:src": siteUrl + "/logo_transparent.png",
    "twitter:card": "summary",
    "twitter:title": meta.title,
    "twitter:description": meta.description,
  };
}
