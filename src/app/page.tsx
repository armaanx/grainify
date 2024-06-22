import BeforeAfterImage from "@/components/BeforeAfterImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center gap-8 ">
        <div className="max-w-7xl flex flex-col items-center justify-center gap-y-8">
          <h1 className="text-5xl md:text-7xl font-bold max-w-3xl">
            Add Vintage Charm to Your Photos
          </h1>
          <Button className="mt-5 w-30  font-bold text-md" size={"lg"}>
            Try it out
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
        <BeforeAfterImage />
      </div>
    </MaxWidthWrapper>
  );
}
