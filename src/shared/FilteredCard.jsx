"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

const FilteredCard = ({ products = [] }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.salePrice || product.productPrice,
        image: product.imageURLs?.[0] || "/placeholder-image.png",
      }),
    );
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 mx-4">
        <p className="text-gray-500 font-medium">
          No products found matching these filters.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Try adjusting your price range or categories.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="group card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          {/* Image Section */}
          <figure className="relative h-64 w-full bg-gray-50">
            <Image
              src={product.imageURLs?.[0] || "/placeholder-image.png"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          </figure>

          {/* Body Section */}
          <div className="card-body p-4 flex flex-col justify-between">
            <div>
              <Link href={`/product/${product._id}`}>
                <h2 className="card-title text-sm font-semibold hover:text-blue-600 transition-colors line-clamp-2 h-10 leading-tight">
                  {product.name}
                </h2>
              </Link>

              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="text-lg font-bold text-blue-600">
                  ৳{product.salePrice || product.productPrice}
                </span>
                {product.productPrice > product.salePrice && (
                  <span className="text-xs text-gray-400 line-through font-medium">
                    ৳{product.productPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Actions Section */}
            <div className="card-actions mt-4 flex flex-col gap-2">
              <Link
                href={`/checkout?product=${product._id}`}
                className="btn btn-primary btn-sm w-full text-white no-animation shadow-sm"
              >
                Buy Now
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-outline btn-primary btn-sm w-full no-animation"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilteredCard;
