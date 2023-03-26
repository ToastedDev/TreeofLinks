import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { LoadingSpinner } from "./loading";

export const Navbar = () => {
  const { isSignedIn, isLoaded: userLoaded, user } = useUser();

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
            <Image
              src={user.profileImageUrl}
              alt="Profile image"
              width={45}
              height={45}
              className="rounded-full"
            />
          ) : (
            <SignInButton>
              <button className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700">
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
