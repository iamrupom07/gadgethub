import Link from "next/link";
import React from "react";

const Cart = () => {
  return (
    <div className="drawer-end z-50">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

      {/* Cart Button */}
      <div className="">
        <label htmlFor="cart-drawer" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 2.25h1.5l1.5 12h13.5l1.5-9h-15"
              />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
            </svg>
            <span className="badge badge-sm badge-primary indicator-item">
              2
            </span>
          </div>
        </label>
      </div>

      {/* Drawer Side */}
      <div className="drawer-side">
        <label htmlFor="cart-drawer" className="drawer-overlay"></label>

        <div className="w-80 min-h-full bg-base-100 p-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">My Cart</h2>
            <label htmlFor="cart-drawer" className="btn btn-sm btn-circle">
              ✕
            </label>
          </div>

          {/* Cart Items */}
          <div className="flex-1 space-y-4 overflow-y-auto">
            {/* Item */}
            <div className="flex gap-3 items-center bg-base-200 p-3 rounded-lg">
              <img
                src="https://img.garagepotti.xyz/upload/0000126/cropped-image_893cf0b4.webp"
                alt="product"
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  Walton WD215I10 Monitor
                </h3>
                <p className="text-xs text-gray-500">BDT 9900</p>

                <div className="flex items-center gap-2 mt-1">
                  <button className="btn btn-xs">−</button>
                  <span className="text-sm">1</span>
                  <button className="btn btn-xs">+</button>
                </div>
              </div>

              <button className="btn btn-xs btn-error btn-outline">
                Remove
              </button>
            </div>

            {/* Item */}
            <div className="flex gap-3 items-center bg-base-200 p-3 rounded-lg">
              <img
                src="https://img.garagepotti.xyz/upload/0000126/cropped-image_44b98536.webp"
                alt="product"
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  Black Shark GT3 Neo
                </h3>
                <p className="text-xs text-gray-500">BDT 2390</p>

                <div className="flex items-center gap-2 mt-1">
                  <button className="btn btn-xs">−</button>
                  <span className="text-sm">1</span>
                  <button className="btn btn-xs">+</button>
                </div>
              </div>

              <button className="btn btn-xs btn-error btn-outline">
                Remove
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">BDT 12290</span>
            </div>

            <Link href="/checkout" className="btn btn-primary w-full">
              Checkout
            </Link>

            <button className="btn btn-outline w-full">View Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
