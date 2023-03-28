import { RedirectToUserProfile } from "@clerk/nextjs";
import type { NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import { Navbar } from "~/components/navbar";

const Redirect: NextPage = () => (
  <main>
    <Navbar />
    <LoadingPage />
    <RedirectToUserProfile />
  </main>
);
export default Redirect;
