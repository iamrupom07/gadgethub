"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

export default function ProductGallery({ images = [] }) {
  const validImages = useMemo(
    () => images.filter((img) => typeof img === "string" && img.trim() !== ""),
    [images],
  );

  const fallback = "/placeholder.png";

  const [active, setActive] = useState(validImages[0] || fallback);

  return (
    <div>
      <Image
        src={active}
        width={450}
        height={450}
        alt="product"
        className="rounded-xl mx-auto"
        priority
      />

      {validImages.length > 1 && (
        <div className="flex justify-center gap-3 mt-4">
          {validImages.map((img) => (
            <button key={img} onClick={() => setActive(img)}>
              <Image
                src={img}
                width={70}
                height={70}
                alt="thumbnail"
                className={`rounded border ${
                  active === img ? "border-primary" : "border-base-300"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
