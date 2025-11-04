import type { DefaultSeoProps } from "next-seo";

const SEO_CONFIG: DefaultSeoProps = {
  titleTemplate: "%s | GLC Learning Center",
  defaultTitle: "GLC Learning Center",
  description:
    "A premium learning innovation hub delivering strategic programs, insights, and partnerships for global education leaders.",
  canonical: "https://glc-template.vercel.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://glc-template.vercel.app",
    siteName: "GLC Learning Center",
    title: "GLC Learning Center",
    description:
      "Premium programming, curated insights, and strategic partnerships tailored for tomorrow's learners.",
    images: [
      {
        url: "https://glc-template.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GLC Learning Center",
      },
    ],
  },
  twitter: {
    handle: "@globallearning",
    site: "@globallearning",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ],
  additionalMetaTags: [
    { name: "theme-color", content: "#f8f8f8" },
  ],
};

export default SEO_CONFIG;

