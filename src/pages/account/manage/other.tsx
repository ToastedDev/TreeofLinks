import { RedirectToUserProfile } from "@clerk/nextjs";
import type { NextPage } from "next";
import { Redirect } from "~/components/redirect";

const RedirectPage: NextPage = () => (
  <Redirect>
    <RedirectToUserProfile />
  </Redirect>
);
export default RedirectPage;
