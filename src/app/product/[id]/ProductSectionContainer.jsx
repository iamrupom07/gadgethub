"use client";
import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

export default function ProductSectionContainer({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variant?.[0] || null,
  );

  const displayImage = selectedVariant?.image || product.imageURLs?.[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 p-6 rounded-xl shadow">
      <ProductGallery
        images={product.imageURLs || []}
        activeImage={displayImage}
      />

      <ProductInfo
        product={product}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />
    </div>
  );
}
