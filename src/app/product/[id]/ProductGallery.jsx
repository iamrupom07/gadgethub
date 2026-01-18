"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <Image
        src={active}
        width={450}
        height={450}
        alt="product"
        className="rounded-xl mx-auto"
      />

      <div className="flex justify-center gap-3 mt-4">
        {images.map((img) => (
          <button key={img} onClick={() => setActive(img)}>
            <Image
              src={img}
              width={70}
              height={70}
              alt=""
              className={`rounded border ${
                active === img ? "border-primary" : "border-base-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
