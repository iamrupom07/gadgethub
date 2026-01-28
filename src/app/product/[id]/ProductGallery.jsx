"use client";
import { useEffect, useState } from "react";

export default function ProductGallery({ images, activeImage }) {
  const [mainImg, setMainImg] = useState(activeImage);

  useEffect(() => {
    setMainImg(activeImage);
  }, [activeImage]);

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full relative bg-gray-50 rounded-lg overflow-hidden ">
        <img
          src={mainImg}
          alt="Product"
          className="w-full h-full object-contain p-4 transition-all duration-300"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImg(img)}
            className={`w-20 h-20 border rounded ${mainImg === img ? "border-primary" : "border-gray-200"}`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
