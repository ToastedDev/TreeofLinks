import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const privatePaths = ["/user/me", "/account*"];

const isPrivate = (path: string) => {
  return privatePaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((req: NextRequest) => {
  if (isPrivate(req.nextUrl.pathname)) {
    const { userId } = getAuth(req);

    if (!userId) {
      // redirect the users to /pages/sign-in/[[...index]].ts

      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  } else return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
