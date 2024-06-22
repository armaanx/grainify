import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-base-200 bg-base-100 p-1 backdrop-blur-lg bg-opacity-5 bg-black">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between flex-wrap p-2">
          <Link href={"/"} className="font-semibold text-2xl pl-2">
            Grainify
          </Link>
          <ThemeToggle />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
