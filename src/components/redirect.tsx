import { type PropsWithChildren } from "react";
import { LoadingPage } from "./loading";
import { Navbar } from "./navbar";

export const Redirect = (props: Required<PropsWithChildren>) => (
  <main>
    <Navbar />
    <LoadingPage />
    {props.children}
  </main>
);
