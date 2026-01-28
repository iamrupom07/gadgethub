"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          "https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website",
          {
            headers: {
              "Content-Type": "application/json",
              "store-id": "0000126",
            },
          },
        );
        const data = await res.json();
        setProducts(data?.data?.data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  // Handler to bridge API data to Redux state
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="group card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          <figure className="relative h-64 w-full bg-gray-50">
            <Image
              src={product.imageURLs?.[0] || "/placeholder-image.png"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          </figure>

          <div className="card-body p-4 flex flex-col justify-between">
            <div>
              <Link href={`/product/${product._id}`}>
                <h2 className="card-title text-sm font-medium hover:text-blue-600 transition-colors line-clamp-2 h-10">
                  {product.name}
                </h2>
              </Link>

              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="text-lg font-bold text-blue-600">
                  ৳{product.salePrice || product.productPrice}
                </span>
                {product.productPrice > product.salePrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ৳{product.productPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="card-actions mt-4 flex flex-col gap-2">
              <Link
                href={`/checkout?product=${product._id}`}
                className="btn btn-primary btn-sm w-full text-white no-animation"
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

export default Card;
