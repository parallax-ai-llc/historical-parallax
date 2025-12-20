"use client";

import * as React from "react";
import Image from "next/image";

interface ArticleImageProps {
    src: string;
    alt: string;
}

export function ArticleImage({ src, alt }: ArticleImageProps) {
    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
        return null;
    }

    return (
        <div className="mb-8">
            <Image
                src={src}
                alt={alt}
                width={320}
                height={420}
                className="object-cover rounded-lg"
                unoptimized
                onError={() => setHasError(true)}
            />
        </div>
    );
}
