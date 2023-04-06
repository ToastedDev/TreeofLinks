import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Provider as BalancerProvider } from "react-wrap-balancer";
const inter = Inter({ subsets: ["latin"] });

import { DefaultSeo } from "next-seo";
import { Toaster } from "react-hot-toast";
import { config as nextSeoConfig } from "~/utils/seo";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Toaster position="bottom-center" />
      <DefaultSeo {...nextSeoConfig} />
      <ClerkProvider {...pageProps}>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily}, "sans-serif";
          }
        `}</style>
        <BalancerProvider>
          <Component {...pageProps} />
        </BalancerProvider>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
