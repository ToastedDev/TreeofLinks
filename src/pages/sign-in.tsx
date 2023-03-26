import { RedirectToSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Redirect: NextPage = () => {
  const router = useRouter();
  const { redirect_url } = router.query;
  if (typeof redirect_url !== "string") return null;

  return <RedirectToSignIn afterSignInUrl={redirect_url} />;
};
export default Redirect;
