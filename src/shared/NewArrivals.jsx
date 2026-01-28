"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getNewArrivals = async () => {
      try {
        // We add sort=-createdAt to get newest items first and limit=5 for a single row
        const res = await fetch(
          "https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website?sort=-createdAt&limit=5",
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
        console.error("Failed to load new arrivals:", err);
      } finally {
        setIsLoading(false);
      }
    };
    getNewArrivals();
  }, []);

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
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-10">
      <div className="flex justify-between items-end mb-8 px-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">New Arrivals</h2>
          <p className="text-gray-500 mt-1">Check out our latest collection</p>
        </div>
        <Link
          href="/products"
          className="text-primary font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="group card bg-base-100 shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
          >
            <figure className="relative h-56 w-full bg-gray-50 overflow-hidden">
              {/* NEW Tag */}
              <div className="absolute top-2 left-2 z-10">
                <span className="badge badge-primary text-white text-[10px] font-bold">
                  NEW
                </span>
              </div>

              <Image
                src={product.imageURLs?.[0] || "/placeholder-image.png"}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
            </figure>

            <div className="card-body p-4">
              <Link href={`/product/${product._id}`}>
                <h3 className="text-sm font-medium line-clamp-2 h-10 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>

              <div className="mt-2">
                <span className="text-lg font-bold text-blue-600">
                  ৳{product.salePrice || product.productPrice}
                </span>
              </div>

              <div className="card-actions mt-4">
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
    </section>
  );
};

export default NewArrivals;
