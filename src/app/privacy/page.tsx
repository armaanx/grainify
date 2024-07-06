import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = () => {
  return (
    <div className="relative min-h-[calc(100vh-150px)]  dark:bg-black">
      <div className="fixed inset-0 bg-transparent dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-zinc-500/15 dark:via-zinc-900/15 dark:to-transparent pointer-events-none" />
      <main className="container mx-auto max-w-7xl  ">
        <div className="w-full flex flex-col justify-center items-center p-6 min-h-[calc(100vh-150px)] ">
          <p className="max-w-prose text-base md:text-lg mx-auto text-pretty dark:text-zinc-300 font-semibold">
            Grainify is committed to protecting your privacy. Our image grain
            application operates entirely within your web browser. We do not
            collect, transmit, or store any of your personal information or
            images. All image processing occurs on your device, and no data is
            sent to our servers or any third parties. We may use basic,
            non-personal analytics to improve our service. By using our website,
            you agree to this policy.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Page;
