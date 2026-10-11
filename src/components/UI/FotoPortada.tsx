"use client";

import { useState } from "react";
import Image from "next/image";
import { rutaPortadaLocal } from "@/lib/fotos";

interface Props {
  id: string;
  fallback: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function FotoPortada({
  id,
  fallback,
  alt,
  sizes,
  className = "object-cover",
  priority = false,
}: Props) {
  const [falloLocal, setFalloLocal] = useState(false);
  const src = falloLocal ? fallback : rutaPortadaLocal(id);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(max-width: 640px) 100vw, 400px"}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      className={className}
      onError={() => setFalloLocal(true)}
    />
  );
}
