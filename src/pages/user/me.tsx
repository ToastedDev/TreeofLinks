import { useUser } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Redirect } from "~/components/redirect";

const RedirectPage: NextPage = () => {
  const router = useRouter();
  const { isLoaded: userLoaded, user } = useUser();

  useEffect(() => {
    if (!userLoaded) return;
    void router.push(`/user/@${user?.username as string}`);
  }, [router, userLoaded, user]);

  if (!userLoaded)
    return (
      <Redirect>
        <p></p>
      </Redirect>
    );

  return (
    <Redirect>
      <p></p>
    </Redirect>
  );
};
export default RedirectPage;
