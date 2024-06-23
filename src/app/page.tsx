import BeforeAfterImage from "@/components/BeforeAfterImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen z-10 flex flex-col items-center justify-center p-4 text-center gap-8 ">
        <div className="max-w-7xl flex flex-col items-center justify-center gap-y-8 z-10 mt-5 p-2 md:p-4">
          <h1 className="text-5xl md:text-6xl font-bold max-w-3xl z-10">
            Add Vintage Charm to Your Photos
          </h1>
          <p className="text-lg font-semibolds max-w-prose">
            Transform your images with our easy-to-use grain effect tool. Bring
            a touch of nostalgia to your digital memories.
          </p>
          <Link
            href={"/apply"}
            className={cn(
              "mt-5 w-30  font-bold text-md",
              buttonVariants({ size: "lg" })
            )}
          >
            Try it out
            <ExternalLink className="w-5 h-5 ml-2" />
          </Link>
        </div>
        <BeforeAfterImage />
      </div>
    </MaxWidthWrapper>
  );
}
