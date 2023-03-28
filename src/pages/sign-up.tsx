import { RedirectToSignUp } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { LoadingPage } from "~/components/loading";
import { Navbar } from "~/components/navbar";

const Redirect: NextPage = () => {
  const router = useRouter();
  const { redirect_url } = router.query;
  if (typeof redirect_url !== "string") return null;

  return (
    <main>
      <Navbar />
      <LoadingPage />
      <RedirectToSignUp afterSignUpUrl={redirect_url} />
    </main>
  );
};
export default Redirect;
