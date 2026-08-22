"use client";
import { useState, forwardRef } from "react";
import Image from "next/image";

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'ref'> {
  src: string;
  alt?: string;
  wrapperClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, wrapperClassName = "", imageClassName = "", style, priority = false, loading = "eager", ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const hasObjectFitClass = /\bobject-(contain|cover|fill|none|scale-down)\b/.test(imageClassName);
    const resolvedImageClassName = hasObjectFitClass ? imageClassName : `object-cover ${imageClassName}`;

    return (
      <div className={`relative overflow-hidden bg-gray-50 ${wrapperClassName}`} style={style}>
        <div className="absolute inset-0">
          <Image
            ref={ref as any}
            src={src}
            alt={alt || "image"}
            fill
            unoptimized
            priority={priority}
            loading={loading}
            onLoad={() => setIsLoaded(true)}
            className={`relative z-10 transition-opacity duration-700 ease-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${resolvedImageClassName}`}
            {...(props as any)}
          />
        </div>
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";
