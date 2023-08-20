"use client"

import { ImageUploadProps } from "@/types"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";



export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value
}: ImageUploadProps) => {

  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) return null;


  return (
    <div>
      <div className="mb-4 items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="fp9opkii">
        { ({open}) => {
          const onClick = () => {
            open();
          }

          return (
            <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
              <ImagePlus className="h-4 w-4 mr-2" />
              Carga imagen de fondo
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
