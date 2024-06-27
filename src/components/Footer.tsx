import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <div className="h-[70px] bg-background border-t z-50">
      <MaxWidthWrapper className="flex flex-row items-center justify-between text-xs 2xs:text-sm text-muted-foreground p-5">
        <div>
          <p>
            Made with ❤️ by{" "}
            <Link
              href={"https://armaan.live"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Armaan
            </Link>
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 md:gap-6">
          <Link className="hover:text-blue-500" href={"/privacy"}>
            Privacy Policy
          </Link>
          <Link className="hover:text-blue-500" href={"/contact"}>
            Contact Me
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
