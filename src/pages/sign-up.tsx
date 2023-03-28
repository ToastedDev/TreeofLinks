import { RedirectToSignUp } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Redirect } from "~/components/redirect";

const RedirectPage: NextPage = () => {
  const router = useRouter();
  const { redirect_url } = router.query;
  if (typeof redirect_url !== "string") return null;

  return (
    <Redirect>
      <RedirectToSignUp
        afterSignUpUrl={redirect_url}
        afterSignInUrl={redirect_url}
      />
    </Redirect>
  );
};
export default RedirectPage;
