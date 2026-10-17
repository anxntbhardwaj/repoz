import { BRAND } from "./brand";

/** Public site origin used for canonical URLs, breadcrumbs and the sitemap. */
export const SITE_URL = "https://altitudeclimber.in";

export function pageHead(path: string, title: string, description: string, crumb?: string) {
  const url = `${SITE_URL}${path}`;
  const scripts = crumb
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: crumb, item: url },
            ],
          }),
        },
      ]
    : [];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: BRAND.name },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts,
  };
}
