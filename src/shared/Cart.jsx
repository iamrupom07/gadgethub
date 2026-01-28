"use client";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "./cartSlice";
// Adjust path

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  return (
    <div className="drawer-end z-50">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

      {/* Cart Icon / Trigger */}
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
              {items.length}
            </span>
          </div>
        </label>
      </div>

      {/* Drawer Side Content */}
      <div className="drawer-side">
        <label htmlFor="cart-drawer" className="drawer-overlay"></label>
        <div className="w-80 min-h-full bg-base-100 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">My Cart ({items.length})</h2>
            <label htmlFor="cart-drawer" className="btn btn-sm btn-circle">
              ✕
            </label>
          </div>

          {/* Dynamic Item List */}
          <div className="flex-1 space-y-4 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center mt-10 text-gray-400 text-sm italic">
                Your cart is empty
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-center bg-base-200 p-3 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold">
                      BDT {item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({ id: item.id, type: "decrement" }),
                          )
                        }
                        className="btn btn-xs"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({ id: item.id, type: "increment" }),
                          )
                        }
                        className="btn btn-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="btn btn-xs btn-error btn-outline"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-bold text-lg">BDT {totalAmount}</span>
            </div>
            <Link
              href="/checkout"
              className={`btn bg-blue-500 text-white w-full ${items.length === 0 ? "btn-disabled" : ""}`}
            >
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
