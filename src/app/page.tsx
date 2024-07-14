import BeforeAfterImage from "@/components/BeforeAfterImage";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Image as ImageIcon,
  Sparkles,
  SquareMousePointer,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen  dark:bg-black">
      <div className="fixed inset-0 bg-transparent dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-zinc-500/15 dark:via-zinc-900/15 dark:to-transparent pointer-events-none" />
      <main className="relative z-10 p-3">
        <section className="container mx-auto py-20 px-4 md:px-6 md:py-48 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-black dark:text-white">
                Add Vintage Charm to Your Images
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Elevate your visual content with our powerful vintage photo
                editor. Transform your images and bring a unique,
                vintage-inspired look to your projects.
              </p>
              <Link href={"/apply"} className={buttonVariants({ size: "lg" })}>
                <span className="font-semibold">Try it out</span>{" "}
                <Sparkles className="w-5 h-5 ml-3" />
              </Link>
            </div>
            <BeforeAfterImage />
          </div>
        </section>
        <section className="container mx-auto py-28 pb-12 lg:pb-28 px-4 border-t w-full max-w-7xl">
          <div className="text-center pt-8 flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-black dark:text-white">
              Why Choose Our Tool?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Easy to Use",
                  icon: (
                    <SquareMousePointer className="inline ml-4 align-middle" />
                  ),
                  description: "Simple interface for quick edits.",
                },
                {
                  title: "High Quality",
                  icon: <ImageIcon className="inline ml-4 align-middle" />,
                  description: "Preserve image quality while adding effects.",
                },
                {
                  title: "Customizable",
                  icon: <Wrench className="inline ml-4 align-middle" />,
                  description:
                    "Choose from over 40+ filters that suit your needs. Adjust grain intensity/type to your liking.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="pb-10 p-8 border rounded-lg shadow-sm bg-white  dark:bg-zinc-900/50 h-[180px] grid grid-flow-row justify-center items-center"
                >
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-black dark:text-white">
                    {feature.title}
                    {feature.icon}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 tracking-tight">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={"/apply"}
              className={cn("mt-6 lg:hidden", buttonVariants({ size: "lg" }))}
            >
              <span className="font-semibold">Try it out</span>{" "}
              <Sparkles className="w-5 h-5 ml-3" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
