"use client";

import React, { useCallback, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { ImageUp } from "lucide-react";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset={"oeyu35xl"}
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => {
                open?.();
              }}
              className={
                "relative cursor-pointer hover:opacity-75 transition-colors border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-400"
              }
            >
              <ImageUp size={50} />
              <div className={"font-semibold text-lg"}>
                <p>Click to Upload</p>
              </div>
              {value && (
                <div className={"absolute inset-0 w-full h-full"}>
                  <Image
                    alt={"Uploaded Image"}
                    fill
                    style={{ objectFit: "cover" }}
                    src={value}
                    sizes={"100vw ,100vh"}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
