import { Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="relative min-h-[calc(100vh-150px)]  dark:bg-black ">
      <div className="fixed inset-0 bg-transparent dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-zinc-500/15 dark:via-zinc-900/15 dark:to-transparent pointer-events-none" />
      <main className="container mx-auto max-w-7xl  ">
        <div className=" w-full flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
          <div className="flex flex-col items-center justify-center gap-6 border-2 p-8 rounded-xl shadow-sm md:p-12 bg-white dark:bg-zinc-900/30">
            <h1 className="text-2xl font-semibold mb-1">Contact Me</h1>
            <div className="flex flex-row items-center justify-center gap-7 md:gap-10">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={"mailto:armaanmishra48@gmail.com"}
              >
                <Mail className="h-9 w-9 hover:text-purple-500" />
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={"https://x.com/armaanmishra131"}
              >
                <Twitter className="h-9 w-9 hover:text-yellow-500" />
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={"https://github.com/armaanx"}
              >
                <Github className="h-9 w-9 hover:text-red-500" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
