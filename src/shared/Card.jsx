"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3">
      {products.map((product) => (
        <div key={product.id} className="card bg-base-100  shadow-sm">
          <figure className="">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
            />
          </figure>
          <div className="card-body items-center text-center">
            <Link href={`/product/${product.id}`}>
              <h2 className="card-title line-clamp-2">{product.title}</h2>
            </Link>

            <div className="flex justify-center items-center gap-2">
              <p className="text-md text-blue-500 font-semibold">
                {product.price}
              </p>

              <div className="text-md text-gray-500 line-through">
                BDT 13500
              </div>
            </div>
            <div className="space-y-2">
              <Link
                href={"/checkout"}
                className="btn bg-blue-500 text-white  w-full"
              >
                Buy Now
              </Link>
              <button className="btn bg-white text-blue-600 w-full">
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
