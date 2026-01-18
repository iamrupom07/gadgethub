import React from "react";

const CheckoutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Details */}
          <div className="bg-base-100 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Billing Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="City"
                className="input input-bordered w-full"
              />
            </div>

            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Full Address"
              rows={3}
            ></textarea>
          </div>

          {/* Payment Method */}
          <div className="bg-base-100 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="radio radio-primary"
                  defaultChecked
                />
                <span>Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="radio radio-primary"
                />
                <span>bKash</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="radio radio-primary"
                />
                <span>Nagad</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-base-100 p-6 rounded-xl shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          {/* Product */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://img.garagepotti.xyz/upload/0000126/cropped-image_893cf0b4.webp"
                alt="product"
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  Walton WD215I10 Monitor
                </h3>
                <p className="text-xs text-gray-500">Qty: 1</p>
              </div>
              <span className="text-sm font-semibold">BDT 9900</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://img.garagepotti.xyz/upload/0000126/cropped-image_44b98536.webp"
                alt="product"
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  Black Shark GT3 Neo
                </h3>
                <p className="text-xs text-gray-500">Qty: 1</p>
              </div>
              <span className="text-sm font-semibold">BDT 2390</span>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>BDT 12290</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>BDT 100</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>BDT 12390</span>
            </div>
          </div>

          <button className="btn btn-primary w-full mt-6">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
