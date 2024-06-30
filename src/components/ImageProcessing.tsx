/* eslint-disable @next/next/no-img-element */
"use client";
import useDebounce from "@/lib/useDebounce";
import useWindow from "@/lib/useWindow";
import { cn } from "@/lib/utils";
import { saveAs } from "file-saver";
import {
  Download,
  Eye,
  EyeOff,
  Shrink,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import TooltipComponent from "./ToolTipComponent";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { useToast } from "./ui/use-toast";

interface ImageProcessingProps {
  file: string;
  fileNull: React.Dispatch<React.SetStateAction<string | null>>;
  bitmap: ImageBitmap | null;
}

const WIDTH = 768;

type GrainType = "monochrome" | "color";

const ImageProcessing: React.FC<ImageProcessingProps> = ({
  file,
  fileNull,
  bitmap,
}) => {
  const [sliderVal, setSliderVal] = useState(0);
  const [grainType, setGrainType] = useState<GrainType>("monochrome");
  const width = useWindow();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(file);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);

  // Initialize worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/imageProcessingWorker.ts", import.meta.url)
    );

    // Cleanup function
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  // Set up worker message handler
  useEffect(() => {
    if (!workerRef.current) return;

    const handleWorkerMessage = (e: MessageEvent) => {
      const { processedData } = e.data;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", {
        desynchronized: true,
        willReadFrequently: true,
      });
      if (canvas && ctx) {
        ctx.putImageData(processedData, 0, 0);
        const newImageUrl = canvas.toDataURL("image/jpeg", 0.8);
        setOutputImageUrl((prevUrl) => {
          if (prevUrl && prevUrl !== file) {
            URL.revokeObjectURL(prevUrl);
          }
          return newImageUrl;
        });
        setIsProcessing(false);
      }
    };

    workerRef.current.onmessage = handleWorkerMessage;

    return () => {
      if (workerRef.current) {
        workerRef.current.onmessage = null;
      }
    };
  }, [file]);

  // Initialize canvas with bitmap
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

  // Cleanup output image URL
  useEffect(() => {
    return () => {
      if (outputImageUrl && outputImageUrl !== file) {
        URL.revokeObjectURL(outputImageUrl);
      }
    };
  }, [outputImageUrl, file]);

  const applyGrain = useCallback(
    (amount: number, type: GrainType) => {
      if (!imageData || !workerRef.current || isProcessing) return;

      setIsProcessing(true);
      workerRef.current.postMessage({ imageData, amount, grainType: type });
    },
    [imageData, isProcessing]
  );

  const handleDownload = useCallback(() => {
    try {
      if (!canvasRef.current) {
        throw new Error("Canvas reference is null");
      }
      const fileName = new Date().getTime().toString() + ".jpeg";
      canvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            saveAs(blob, fileName);
          } else {
            throw new Error("Failed to create blob from canvas");
          }
        },
        "image/jpeg",
        0.8
      );
    } catch (e) {
      toast({
        title: "Error occurred while downloading",
        description: "Try right clicking and saving the image",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSliderChange = useDebounce((value: number[]) => {
    if (value[0] === 0) {
      setIsPreview(false);
      setOutputImageUrl(file);
      return;
    }
    setIsPreview(false);
    setSliderVal(value[0]);
    applyGrain(value[0], grainType);
  }, 500);

  const handleGrainTypeChange = useCallback(
    (value: GrainType) => {
      if (sliderVal === 0) {
        setIsPreview(false);
        setGrainType(value);
        return;
      }
      setIsPreview(false);
      setGrainType(value);
      applyGrain(sliderVal, value);
    },
    [sliderVal, applyGrain]
  );

  const isVertical = useMemo(() => width! < WIDTH, [width]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full mx-auto p-5 relative">
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
          <div className="absolute top-2 right-2 z-10">
            <TooltipComponent content="Close Image">
              <Button
                variant={"outline"}
                size={"sm"}
                className="h-9 w-10 p-0"
                onClick={() => fileNull(null)}
              >
                <X className="w-4 h-4 2xs:h-5 2xs:w-5" />
              </Button>
            </TooltipComponent>
          </div>
          <div className="absolute bottom-2 left-2 z-10">
            <TooltipComponent content="Preview">
              <Button
                disabled={outputImageUrl === file || sliderVal === 0}
                variant={"outline"}
                size={"sm"}
                onClick={() => setIsPreview((prev) => !prev)}
              >
                {isPreview ? (
                  <EyeOff className="w-4 h-4 2xs:h-5 2xs:w-5" />
                ) : (
                  <Eye className="w-4 h-4 2xs:h-5 2xs:w-5" />
                )}
              </Button>
            </TooltipComponent>
          </div>
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={7}
            limitToBounds={true}
            doubleClick={{ disabled: true }}
            //onZoomStop={handleZoomStop}
            disabled={isProcessing}
            wheel={{ touchPadDisabled: true, disabled: false }}
            //pinch={{ disabled: true }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute bottom-2 right-2  z-10 flex flex-col md:flex-row gap-1 ">
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => zoomIn()}
                  >
                    <ZoomIn className="w-4 h-4  2xs:h-5 2xs:w-5" />
                  </Button>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => zoomOut()}
                  >
                    <ZoomOut className="w-4 h-4 2xs:h-5 2xs:w-5" />
                  </Button>
                  <TooltipComponent content="Fit in view">
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      onClick={() => resetTransform()}
                    >
                      <Shrink className="w-4 h-4 2xs:h-5 2xs:w-5" />
                    </Button>
                  </TooltipComponent>
                </div>
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                  contentStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    className={cn(
                      "w-full cursor-grab",
                      isVertical ? "h-[400px] 2xs:h-[550px]" : "h-full"
                    )}
                  >
                    {isPreview ? (
                      <img
                        src={file}
                        alt="Processed Image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <img
                        src={outputImageUrl || file}
                        alt="Processed Image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
          {isProcessing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white">Processing...</p>
            </div>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle={!isVertical} disabled={isVertical} />
        <ResizablePanel
          defaultSize={30}
          maxSize={isVertical ? 30 : 40}
          minSize={isVertical ? 25 : 0}
          className={cn(
            "flex items-center justify-center flex-col gap-2 md:gap-8 p-2",
            isVertical ? "min-h-[150px]" : "min-w-[200px] lg:min-w-[300px]"
          )}
        >
          <div className="flex flex-col gap-3 2xs:gap-5 md:gap-7 w-full p-5">
            <div className="flex flex-row w-full items-center justify-between">
              <Label>Grain Type</Label>
              <Select
                disabled={isProcessing}
                onValueChange={handleGrainTypeChange}
                value={grainType}
              >
                <SelectTrigger className="w-[135px] h-8">
                  <SelectValue placeholder="Select grain type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                  <SelectItem value="color">Color</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <div className="flex flex-row w-full items-center justify-center gap-5">
              <TooltipComponent content="Download" side="bottom">
                <Button
                  size="sm"
                  variant={"outline"}
                  className="p-4 font-semibold"
                  onClick={handleDownload}
                  disabled={isProcessing}
                >
                  <Download className="w-4 h-4 2xs:h-5 2xs:w-5" />
                </Button>
              </TooltipComponent>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default ImageProcessing;
