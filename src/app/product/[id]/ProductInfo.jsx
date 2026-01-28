"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "@/shared/cartSlice";

export default function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
}) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const currentPrice = selectedVariant?.salePrice || product.salePrice;
  const originalPrice = selectedVariant?.productPrice || product.productPrice;
  const isOutOfStock = selectedVariant
    ? selectedVariant.quantity < 1
    : !product.stock;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("This variant is out of stock!");
      return;
    }

    for (let i = 0; i < qty; i++) {
      dispatch(
        addToCart({
          id: product._id,
          variantId: selectedVariant?._id,
          name: `${product.name} ${selectedVariant ? `(${selectedVariant.attributes.Color})` : ""}`,
          price: currentPrice,
          image:
            selectedVariant?.image ||
            product.imageURLs?.[0] ||
            "/placeholder-image.png",
        }),
      );
    }
    toast.success(`${qty} item(s) added to cart!`);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Category:{" "}
        <span className="text-primary capitalize">
          {product.category?.[0] || "General"}
        </span>
      </p>

      <h1 className="text-2xl md:text-3xl font-bold text-base-content leading-tight">
        {product.name}
      </h1>

      <div className="flex items-center gap-2 text-sm">
        <div className="rating rating-xs">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              className={`mask mask-star-2 ${
                star <= (product.ratingValue || 5)
                  ? "bg-orange-400"
                  : "bg-gray-300"
              }`}
              disabled
            />
          ))}
        </div>
        <span className="text-gray-500">
          ({product.review?.length || 0} Reviews)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`badge ${!isOutOfStock ? "badge-success" : "badge-error"} badge-outline font-semibold`}
        >
          {!isOutOfStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {product.variantType &&
        product.variant?.length > 0 &&
        product.variant[0]?.attributes?.Color && (
          <div className="space-y-3 pt-2">
            <p className="font-medium text-sm">Select Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.variant.map((v) => (
                <button
                  key={v._id}
                  onClick={() => setSelectedVariant(v)}
                  className={`border-2 rounded-lg p-1 transition-all ${
                    selectedVariant?._id === v._id
                      ? "border-primary bg-primary/5"
                      : "border-base-300 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2 px-2 py-1">
                    <span className="text-sm font-medium">
                      {v.attributes?.Color}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      <div className="bg-base-200/50 p-4 rounded-xl flex items-center gap-4">
        <div>
          <p className="text-sm text-gray-500">Special Price</p>
          <span className="text-3xl font-bold text-primary">
            ৳{currentPrice}
          </span>
        </div>

        {originalPrice > currentPrice && (
          <div className="flex flex-col">
            <span className="line-through text-gray-400 text-sm">
              ৳{originalPrice}
            </span>
            <span className="text-error text-xs font-bold">
              {Math.round(
                ((originalPrice - currentPrice) / originalPrice) * 100,
              )}
              % OFF
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 py-2">
        <span className="font-medium text-sm">Quantity:</span>
        <div className="join border border-base-300">
          <button
            className="btn btn-sm join-item btn-ghost"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <div className="btn btn-sm join-item no-animation bg-transparent border-none px-4">
            {qty}
          </div>
          <button
            className="btn btn-sm join-item btn-ghost"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        <Link
          href={`/checkout?productId=${product._id}&variantId=${selectedVariant?._id || ""}&qty=${qty}`}
          className={`btn btn-primary text-white shadow-lg ${isOutOfStock ? "btn-disabled" : ""}`}
        >
          অর্ডার করুন
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="btn btn-outline btn-primary"
        >
          কার্টে যোগ করুন
        </button>

        <a
          href={`https://wa.me/880XXXXXXXXXX?text=I want to order ${product.name} ${selectedVariant ? `(${selectedVariant.attributes.Color})` : ""}. Quantity: ${qty}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success text-white col-span-1 sm:col-span-2 mt-2 gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
          WhatsApp Order
        </a>
      </div>
    </div>
  );
}
