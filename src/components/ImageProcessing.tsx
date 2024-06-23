import Image from "next/image";

const ImageProcessing = ({ file }: { file: File }) => {
  const src = URL.createObjectURL(file);
  return (
    <div className="flex flex-col items-center justify-center w-full  mx-auto space-y-4 h-screen ">
      <div className="relative w-[350px] h-[500px] md:w-[500px] md:h-[700px]">
        <Image
          src={src}
          alt=""
          className="object-contain"
          fill
          quality={100}
          unoptimized={true}
        />
      </div>
    </div>
  );
};
export default ImageProcessing;
