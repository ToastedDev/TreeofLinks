import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Toaster position="bottom-center" />
      <ClerkProvider {...pageProps}>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily}, "sans-serif";
          }
        `}</style>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
