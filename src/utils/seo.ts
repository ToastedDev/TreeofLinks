import type { DefaultSeoProps } from "next-seo";
import colors from "tailwindcss/colors";

export const config: DefaultSeoProps = {
  title: "Home",
  titleTemplate: "%s | TreeofLinks",
  description: "Make your own custom page to link on your Discord about me.",
  themeColor: colors.green[500],
  additionalLinkTags: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "mask-icon",
      color: "#5fd55b",
      href: "/safari-pinned-tab.svg",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
  additionalMetaTags: [
    {
      name: "msapplication-TileColor",
      content: "#00a300",
    },
  ],
  twitter: {
    handle: "@ToastedDev",
    cardType: "summary",
  },
  openGraph: {
    type: "website",
    url: "https://treeoflinks.tk",
  },
};
