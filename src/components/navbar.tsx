import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
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
    </header>
  );
};
