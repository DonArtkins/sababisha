"use client";
import { useState, forwardRef } from "react";
import Image from "next/image";

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'ref'> {
  src: string;
  alt?: string;
  wrapperClassName?: string;
  imageClassName?: string;
  priority?: boolean;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, wrapperClassName = "", imageClassName = "", style, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div className={`relative overflow-hidden bg-gray-200/50 ${wrapperClassName}`} style={style}>
        {/* Shimmer Placeholder */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-gray-200/50 via-gray-100/50 to-gray-200/50 bg-[length:200%_100%] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-opacity duration-700 ease-out z-0 ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`} 
        />
        <Image
          ref={ref as any}
          src={src}
          alt={alt || "image"}
          fill
          unoptimized
          onLoad={() => setIsLoaded(true)}
          className={`relative z-10 transition-opacity duration-700 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${imageClassName}`}
          {...(props as any)}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";
