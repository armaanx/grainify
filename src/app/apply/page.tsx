"use client";
import ImageProcessing from "@/components/ImageProcessing";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

const Page = () => {
  const { toast } = useToast();
  const [isDrag, setIsDrag] = useState(false);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);
  useEffect(() => {
    if (fileDataUrl) {
      return () => {
        URL.revokeObjectURL(fileDataUrl);
        setFileDataUrl(null);
        setImageBitmap(null);
      };
    }
  }, [fileDataUrl]);
  const onDropAccepted = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFileDataUrl(objectUrl);
      const imageBitmap = await createImageBitmap(file);
      setImageBitmap(imageBitmap);
      setIsDrag(false);
    }
  };
  const onDropRejected = () => {
    toast({
      title: "File not supported",
      description: "Please upload a PNG, JPG, or JPEG file.",
      variant: "destructive",
    });
  };
  if (fileDataUrl) {
    return (
      <ImageProcessing
        file={fileDataUrl}
        fileNull={setFileDataUrl}
        bitmap={imageBitmap}
      />
    );
  }
  return (
    <div className="container mx-auto max-w-7xl   ">
      <div className="flex flex-col items-center justify-center w-full  space-y-4 min-h-[calc(100vh-150px)]">
        <Dropzone
          onDragEnter={() => setIsDrag(true)}
          onDragLeave={() => setIsDrag(false)}
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-8 bg-background ",
                isDrag &&
                  "border-8 rounded-lg border-blue-500 border-opacity-80 bg-blue-200/30 dark:bg-blue-400/20"
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div
                className={
                  "flex flex-col items-center justify-center w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] text-sm text-center md:text-lg px-8 py-8 border-2 border-dashed rounded-lg cursor-pointer dark:border-muted"
                }
              >
                <UploadIcon className="w-8 h-8 mb-2 text-foreground" />
                <p className="text-foreground font-semibold">
                  Drag and drop your image here or click to select a file.
                </p>
                <p className="text-muted-foreground text-xs md:text-sm mt-4 font-medium">
                  PNG, JPG, and JPEG are supported.
                </p>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
