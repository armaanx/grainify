import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-6">
      <MaxWidthWrapper>
        <p className="max-w-prose text-base md:text-lg mx-auto text-pretty dark:text-zinc-300 font-semibold">
          Grainify is committed to protecting your privacy. Our image grain
          application operates entirely within your web browser. We do not
          collect, transmit, or store any of your personal information or
          images. All image processing occurs on your device, and no data is
          sent to our servers or any third parties. We may use basic,
          non-personal analytics to improve our service. By using our website,
          you agree to this policy.
        </p>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
