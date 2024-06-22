import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="sticky backdrop-blur-md  z-50 top-0 left-0 right-0 border-b  shadow-sm flex items-center justify-between ">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between flex-wrap p-2">
          <Link href={"/"} className="font-semibold text-2xl pl-2">
            Grainify
          </Link>
          <div className="z-50">
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
