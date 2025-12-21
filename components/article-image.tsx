"use client";

import * as React from "react";
import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function ArticleImage({ src, alt, priority = false }: ArticleImageProps) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return null;
  }

  return (
    <figure className="mb-8">
      <Image
        src={src}
        alt={alt}
        width={320}
        height={420}
        className="object-cover rounded-lg"
        unoptimized
        onError={() => setHasError(true)}
        // LCP 최적화: 첫 번째 이미지는 priority 설정
        priority={priority}
        // CLS 방지: 로딩 중 공간 확보
        placeholder="empty"
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, 320px"
      />
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
