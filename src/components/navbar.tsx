import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { LoadingSpinner } from "./loading";

export const Navbar = () => {
  const { isSignedIn, isLoaded: userLoaded } = useUser();

  return (
    <header className="flex items-center justify-between bg-neutral-800/40 p-4">
      <nav>
        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-green-500"
        >
          <Image src="/tree.png" alt="Tree" width={45} height={45}></Image>
          TreeofLinks
        </Link>
      </nav>
      <div className="pr-2">
        {userLoaded ? (
          isSignedIn ? (
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/account/manage"
              showName={false}
              appearance={{
                baseTheme: dark,
                elements: {
                  userButtonAvatarBox: {
                    width: "40px",
                    height: "40px",
                  },
                  userButtonTrigger: {
                    "&:focus": {
                      boxShadow: "none",
                    },
                  },
                  // userPreviewSecondaryIdentifier: {
                  //   "&::before": {
                  //     content: ['"@"'],
                  //     display: "inline-block",
                  //   },
                  // },
                },
              }}
            />
          ) : (
            <SignInButton>
              <button className="rounded-md bg-green-600 px-4 py-2 hover:bg-green-700">
                Sign in
              </button>
            </SignInButton>
          )
        ) : (
          <LoadingSpinner size={30} />
        )}
      </div>
    </header>
  );
};
