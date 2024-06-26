"use client";
import useDebounce from "@/lib/useDebounce";
import useWindow from "@/lib/useWindow";
import { cn } from "@/lib/utils";
import { Download, Undo2 } from "lucide-react";
import { default as NextImage } from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Slider } from "./ui/slider";
import { saveAs } from "file-saver";

interface ImageProcessingProps {
  file: string;
  fileNull: React.Dispatch<React.SetStateAction<string | null>>;
  bitmap: ImageBitmap | null;
}

const WIDTH = 768;

const ImageProcessing = ({ file, fileNull, bitmap }: ImageProcessingProps) => {
  const [sliderVal, setSliderVal] = useState(0);
  const width = useWindow();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(file);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/imageProcessingWorker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (e: MessageEvent) => {
      const { processedData } = e.data;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", {
        desynchronized: true,
        willReadFrequently: true,
      });
      if (canvas && ctx) {
        ctx.putImageData(processedData, 0, 0);
        setOutputImageUrl(canvas.toDataURL("image/jpeg", 0.8));
        setIsProcessing(false);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (!bitmap) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", {
      desynchronized: true,
      willReadFrequently: true,
    });
    if (canvas && ctx) {
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      ctx.drawImage(bitmap, 0, 0);
      setImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  }, [bitmap]);

  const applyGrain = useCallback(
    (amount: number) => {
      if (!imageData || !workerRef.current || isProcessing) return;

      setIsProcessing(true);
      workerRef.current.postMessage({ imageData, amount });
    },
    [imageData, isProcessing]
  );
  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;
    const fileName = new Date().getTime().toString() + ".jpeg";
    canvasRef.current.toBlob(
      (blob) => {
        saveAs(blob!, fileName);
      },
      "image/jpeg",
      0.8
    );
  }, []);

  const handleSliderChange = useDebounce((value: number[]) => {
    setSliderVal(value[0]);
    applyGrain(value[0]);
  }, 500);

  const isVertical = useMemo(() => width! < WIDTH, [width]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full mx-auto p-5">
      <ResizablePanelGroup
        direction={isVertical ? "vertical" : "horizontal"}
        className={cn(
          "max-w-6xl border-[1px] shadow-sm rounded-lg bg-white dark:bg-background",
          isVertical ? "min-h-[550px] 2xs:min-h-[800px]" : "min-h-[600px]"
        )}
      >
        <ResizablePanel
          defaultSize={70}
          maxSize={isVertical ? 70 : 80}
          minSize={isVertical ? 70 : 50}
          className={cn(
            "relative p-1",
            isVertical ? "min-h-[200px] xs:min-h-[500px]" : "h-[600px]"
          )}
        >
          <NextImage
            src={outputImageUrl || file}
            alt="Uploaded Image"
            className="p-1.5 object-contain"
            priority
            fill
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white">Processing...</p>
            </div>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle={!isVertical} disabled={isVertical} />
        <ResizablePanel
          defaultSize={30}
          maxSize={isVertical ? 25 : 40}
          minSize={isVertical ? 25 : 0}
          className={cn(
            "flex items-center justify-center flex-col gap-2 md:gap-8 p-2",
            isVertical ? "min-h-[150px]" : "min-w-[200px] lg:min-w-[300px]"
          )}
        >
          <div className="flex flex-col gap-4 w-full p-5">
            <div className="flex flex-row w-full items-center justify-between">
              <Label>Intensity</Label>
              <Label>{sliderVal}</Label>
            </div>
            <Slider
              onValueChange={(val) => {
                setSliderVal(val[0]);
                handleSliderChange(val);
              }}
              defaultValue={[sliderVal]}
              min={0}
              max={100}
              step={1}
              disabled={isProcessing}
            />
            <div className="flex flex-row w-full items-center justify-center gap-5 pt-4">
              <Button
                size="sm"
                className="w-fit font-semibold"
                onClick={handleDownload}
                disabled={isProcessing}
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                size={"sm"}
                className="w-fit font-semibold"
                onClick={() => fileNull(null)}
              >
                <Undo2 className="w-5 h-5  " />
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default ImageProcessing;
