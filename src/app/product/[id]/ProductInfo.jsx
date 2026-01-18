"use client";
import Link from "next/link";
import { useState } from "react";

export default function ProductInfo({ product }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Category:{" "}
        <span className="text-primary capitalize">{product.category}</span>
      </p>

      <h1 className="text-3xl font-bold">{product.title}</h1>

      <div className="flex items-center gap-2 text-success">
        ⭐ {product.rating} ({product.reviewsCount} Reviews)
      </div>

      <p className="text-success font-medium">
        {product.stock ? "In Stock" : "Out of Stock"}
      </p>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-warning">
          {product.currency} {product.price}
        </span>
        <span className="line-through text-gray-400">
          {product.currency} {product.originalPrice}
        </span>
        <span className="badge badge-error text-white">
          {product.discount}% OFF
        </span>
      </div>

      <p className="text-gray-600">{product.shortDescription}</p>

      <div className="join">
        <button
          className="btn join-item"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <button className="btn join-item no-animation">{qty}</button>
        <button className="btn join-item" onClick={() => setQty((q) => q + 1)}>
          +
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Link href={"/checkout"} className="btn btn-primary">
          অর্ডার করুন
        </Link>
        <button className="btn btn-warning">কার্টে যোগ করুন</button>
        <button className="btn btn-success col-span-2">WhatsApp Order</button>
      </div>
    </div>
  );
}
